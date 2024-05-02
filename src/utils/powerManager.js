const { app, Tray } = require('electron');
const logger = require('./logManager');
const windowManager = require('./windowManager');

function quit() {
    logger.write('utils', 'PowerManager > quit', 'Sinal de encerramente recebido');
    windowManager.closeAllWindows();
    require('./trayManager').closeTray();
    app.quit();
}

function restart() {
    logger.write('utils', 'PowerManager > restart', 'Sinal de reinicio recebido');
    app.relaunch();
    app.quit();
}

app.restart
module.exports = {
    quit,
    restart
}