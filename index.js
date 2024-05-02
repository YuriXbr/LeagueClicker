const { app, dialog } = require('electron');
const { ipcMain } = require('electron');
if (require('electron-squirrel-startup')) app.quit();
const fs = require('fs');
const configManager = require('./src/utils/configManager.js');
const keyManager = require('./src/utils/keyManager.js');
const windowManager = require('./src/utils/windowManager.js');
const updater = require('./src/utils/updateManager.js');
const cache = require('./src/configs/cache.js')
const logger = require('./src/utils/logManager.js');

/**
 * 
 * @param {String} first - opicional, informa se é a primeira execução do programa ou não
 */
async function setup(first) {
    await configManager.setupConfig();
    if(first) await updater.checkUpdates();
    await require('./src/utils/localeManager.js').setupLocales();
    keyManager.setupKeybinds();
    require('./src/utils/trayManager.js').createTrayIcon();
    if(first) logger.write('utils', 'main > setup', 'INICIALIZACAO CONCLUIDA');
}

// function loop() {
//     setInterval(() => {
//         //if (!cache.pauseReading()) {
//         //    mouseManager.getMousePosition(true)
//         //}



//     }, configManager.config.loopdelay);
// }


async function quit() {
    require('./src/utils/trayManager.js').closeTray();
    if(cache._recordedPositions[0][0] == undefined) return app.quit();
    const positionsText = await cache._recordedPositions.map((pos, index) => {
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
            windowManager.closeAllWindows();
            app.quit();
        }
    }).catch(err => {
        logger.writeError('utils','quit()','Erro ao abrir o diálogo de salvamento:',err)
    });
    windowManager.closeAllWindows();
    app.quit();
}

ipcMain.on('request-config', (event) => {
    
    logger.write('config','IPC > request-config', "O front end requisitou as configuraç~eos");
    event.reply('config-response', configManager.getConfig());
  });

  ipcMain.on('update-settings', (event, { keybinds, clickPositions }) => {
    logger.write('config','IPC > update-settings', JSON.stringify({ keybinds, clickPositions }));
    configManager.updateToFile('keybinds', keybinds);
    configManager.updateToFile('clickPositions', clickPositions);
    setup();
});

app.on('ready', () => {
    setup('first');
    //loop();
});

app.on('before-quit', (event) => {
    logger.writeConsole('before-quit',"Recorded Positions:\n");
    cache._recordedPositions.forEach((pos, index) => {
        if(pos[0] != undefined) logger.writeConsole('before-quit',`index: ${index} ; X: ${pos[0]} Y: ${pos[1]}`);
    });
    
});



module.exports = {
    setup,
    //loop,
    quit,
}