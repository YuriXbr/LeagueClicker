const {Menu, Tray} = require("electron");
const fs = require('fs');
const path = require('path');
const mouseManager = require('./mouseManager.js');
const windowManager = require('./windowManager.js');
const configManager = require('./configManager.js');
const logger = require('./logManager.js');
const power = require('./powerManager.js');

let tray;
let contextMenu;

let config = configManager.getConfig();

const langFolder = path.join(__dirname, "../", "locales");
let langPath = path.join(langFolder, `${config.config.language}.json`);
let lang = require(langPath);

function getLocaleMenuItem() {
    const availableLanguages = fs.readdirSync(langFolder);
    logger.write('utils','TrayManager > getLocaleMenuItem', "Gerando mapa de localizacoes");
    const languageMenuItems = availableLanguages.map(languageFile => {
    const languageCode = path.basename(languageFile, '.json');
    return {
        label: languageCode,
        type: 'normal',
        click: () => { 
            config.config.language = languageCode;
            fs.writeFileSync('c:/LeagueClicker/config.json', JSON.stringify(config, null, 4), 'utf-8');
            return createTrayIcon();
            }
        };
    });
    return languageMenuItems;
}

function getClickPositionsMenuItem(){
    config = require("c:/LeagueClicker/config.json")
    logger.write('utils','TrayManager > getClickPositionsMenuItem', "Gerando mapa de clickPositions");
    const clickPositionsItems = Object.entries(config.clickPositions).map(([position, { x, y, button }]) => ({
        label: `${lang.tray[position]} X ${x} : Y ${y}`,
        type: 'normal',
        click: () => mouseManager.singleClick(x, y, button)
    }));
    return clickPositionsItems;
}

function updateContextMenu() {
    config = require("c:/LeagueClicker/config.json")
    langPath = path.join(langFolder, `${config.config.language}.json`);
    lang = require(langPath);
    logger.write('utils','TrayManager > updateContextMenu', "Atualizando menu");

    contextMenu = Menu.buildFromTemplate([
        { label: lang.tray.header, type: 'normal' },
        { type: 'separator' },
        { label: `${lang.tray.recordMousePosition}: ${config.keybinds.recordMousePosition}`, type: 'normal' },
        { label: `${lang.tray.showPositions}: ${config.keybinds.showPositions}`, type: 'normal' },
        { label: `${lang.tray.pauseResumeMacro}: ${config.keybinds.pauseResumeMacro}`, type: 'normal' },
        { label: `${lang.tray.pauseResumeMouseReading}: ${config.keybinds.pauseResumeMouseReading}`, type: 'normal' },
        { label: `${lang.tray.exit}: ${config.keybinds.exit}`, type: 'normal' },
        { type: 'separator' },
        { label: lang.tray.previewClicks, type: 'submenu', submenu: getClickPositionsMenuItem() },
        { label: "Languages", type: 'submenu', submenu: getLocaleMenuItem() },
        { label: `Settings`, type: 'normal', click: () => { windowManager.invoke("settings") } },
        { label: `Reload`, type: 'normal', click: () => { power.restart() } },
        { type: 'separator' },
        { label: lang.tray.quit, type: 'normal', click: () => { power.quit() } }
    ]);
    return contextMenu;
}



function createTrayIcon() {
    if (tray && !tray.isDestroyed()) {
        logger.write('utils','TrayManager > CreateTrayIcon', "Tray já foi criada, recriando...");
        tray.destroy();
    }
    logger.write('utils','TrayManager > CreateTrayIcon', "Criando Tray...");

    tray = new Tray(path.join(__dirname, "../", "assets", "app.ico"));
    tray.setToolTip('League Clicker');
    tray.setContextMenu(updateContextMenu());
}

function closeTray() {
    logger.write('utils','TrayManager > closeTray', "Destruindo o tray menu");
    tray.destroy();
    return;
}

module.exports = {
    createTrayIcon,
    updateContextMenu,
    closeTray
}