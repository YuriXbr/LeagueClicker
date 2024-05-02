const { app, Tray } = require('electron');
const logger = require('./logManager');
const windowManager = require('./windowManager');

function quit() {
    logger.write('utils', 'PowerManager > quit', 'Sinal de encerramente recebido');
    windowManager.closeAllWindows();
    require('./trayManager').closeTray();
    app.quit();
}

module.exports = {
    quit,
}