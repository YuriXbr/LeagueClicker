const { app, ipcMain } = require('electron');
if (require('electron-squirrel-startup')) app.quit();

const logger = require('./src/utils/logManager.js');
const configManager = require('./src/utils/configManager.js');


/**
 * @param {String} first - opicional, informa se é a primeira execução do programa ou não
 */
async function setup(first) {
    await configManager.setupConfig();

    const updater = require('./src/utils/updateManager.js');
    if(first) await updater.checkUpdates();
    
    const localeManager = require('./src/utils/localeManager.js')
    await localeManager.setupLocales();

    const keyManager = require('./src/utils/keyManager.js');
    keyManager.setupKeybinds();

    const trayManager = require('./src/utils/trayManager.js')
    trayManager.createTrayIcon();
    if(first) logger.write('utils', 'main > setup', 'INICIALIZACAO CONCLUIDA');
}

// function loop() {
//     setInterval(() => {
//         //if (!cache.pauseReading()) {
//         //    mouseManager.getMousePosition(true)
//         //}



//     }, configManager.config.loopdelay);
// }


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



module.exports = {
    setup
}