const {Menu, Tray} = require("electron");
const fs = require('fs');
const path = require('path');
const main = require(path.join(__dirname, "../", "../", "index.js"));
const click = require('./mouseManager.js');
const keyManager = require('./keyManager.js');
let tray;
let contextMenu;

let config = require("c:/LeagueClicker/config.json")

const langFolder = path.join(__dirname, "../", "locales");
let langPath = path.join(langFolder, `${config.config.language}.json`);
let lang = require(langPath);

function getLocaleMenuItens() {
    const availableLanguages = fs.readdirSync(langFolder);
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
    const clickPositionsItems = Object.entries(config.clickPositions).map(([position, { x, y, button }]) => ({
        label: `${lang.tray[position]} X ${x} : Y ${y}`,
        type: 'normal',
        click: () => click.singleClick(x, y, button)
    }));
    return clickPositionsItems;
}

function updateContextMenu() {
    config = require("c:/LeagueClicker/config.json")
    langPath = path.join(langFolder, `${config.config.language}.json`);
    lang = require(langPath);

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
        { label: "Languages", type: 'submenu', submenu: getLocaleMenuItens() },
        { type: 'separator' },
        { label: lang.tray.quit, type: 'normal', click: () => { main.quit(); } }
    ]);
    return contextMenu;
}



function createTrayIcon() {
    if (tray && !tray.isDestroyed()) {
        console.log("[Tray.js > createTrayIcon] Tray ja existe, recriando")
        tray.destroy();
    }
    console.log("[Tray.js > createTrayIcon] Criando Tray")
    
    tray = new Tray(path.join(__dirname, "../", "assets", "app.ico"));
    tray.setToolTip('Macro');
    tray.setContextMenu(updateContextMenu());
}

module.exports = {
    createTrayIcon,
    updateContextMenu
}