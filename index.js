const { app, Menu, Tray, globalShortcut, dialog } = require('electron');
const { ipcMain, ipcRenderer } = require('electron');
if (require('electron-squirrel-startup')) app.quit();

const { mouse } = require("@nut-tree/nut-js");
const fs = require('fs');
const path = require('path');

const localeManager = require('./src/utils/localeManager.js');
const configManager = require('./src/utils/configManager.js');
const keyManager = require('./src/utils/keyManager.js');
const mouseManager = require('./src/utils/mouseManager.js');
const windowManager = require('./src/utils/windowManager.js');
const cache = require('./src/configs/cache.js')

app.on('ready', () => {
    setup();
    loop();
});

async function setup() {
    await configManager.setupConfig();
    localeManager.setupLocales();
    await keyManager.setupKeybinds();
    require('./src/utils/trayManager.js').createTrayIcon();
}

function loop() {
    setInterval(() => {
        if (!pauseReading) {
            getMousePosition(true)
        }
    }, config.config.loopdelay);

}


async function quit() {
    if(recordedPositions[0][0] == undefined) return app.quit();
    const positionsText = await recordedPositions.map((pos, index) => {
        return `index: ${index} ; X: ${pos[0]} Y: ${pos[1]}`;
    }).join('\n');
    await dialog.showSaveDialog({
        title: 'Escolha o diretório para salvar as posições',
        defaultPath: 'positions.txt',
        buttonLabel: 'Salvar',
        filters: [{ name: 'Text Files', extensions: ['txt'] }]
    }).then(result => {
        if (!result.canceled && result.filePath) {
            fs.writeFileSync(result.filePath, positionsText, 'utf-8');
            app.quit();
        }
    }).catch(err => {
        console.error('Erro ao abrir o diálogo de salvamento:', err);
    });

    app.quit();
}

app.on('before-quit', (event) => {
    require('./src/utils/trayManager.js').closeTray();
    console.log("\n\n\nRecorded Positions:\n");
    recordedPositions.forEach((pos, index) => {
        if(pos[0] != undefined) console.log(`index: ${index} ; X: ${pos[0]} Y: ${pos[1]}`);
    });
    windowManager.closeAllWindows();
    
});

ipcMain.on('request-config', (event) => {
    const keybinds = configManager.getConfig().keybinds;
    console.log("enviando", {keybinds})
    event.reply('config-response', {keybinds});
  });

ipcMain.on('update-keybinds', (event, newKeybinds) => {
    console.log({newKeybinds});
    configManager.updateToFile('keybinds', newKeybinds);
    setup();

})
