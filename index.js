const { app, ipcMain } = require('electron');
if (require('electron-squirrel-startup')) app.quit();

const configManager = require('./src/utils/configManager.js');
const keyManager = require('./src/utils/keyManager.js');
const updater = require('./src/utils/updateManager.js');
const logger = require('./src/utils/logManager.js');
const trayManager = require('./src/utils/trayManager.js')
const localeManager = require('./src/utils/localeManager.js')
/**
 * @param {String} first - opicional, informa se é a primeira execução do programa ou não
 */
async function setup(first) {
    await configManager.setupConfig();
    if(first) await updater.checkUpdates();
    await localeManager.setupLocales();
    keyManager.setupKeybinds();
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