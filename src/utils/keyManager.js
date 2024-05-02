const {globalShortcut} = require('electron');
const cache = require('../configs/cache')
const click = require('./mouseManager');
const dialogManager = require('./dialogManager');
const configManager = require('./configManager');
const logger = require('./logManager')

function removeAllKeybinds() {
    logger.write('utils', 'KeyManager > removeAllKeybinds', 'Removendo teclas de atalho vinculadas...')
    try{
    globalShortcut.unregisterAll();
    logger.write('utils', 'KeyManager > removeAllKeybinds', 'TODAS teclas de atalhos removidos.')
    } catch(err) {
        logger.writeError('utils', 'KeyManager > removeAllKeybinds', 'Falha ao remover remover as teclas de atalho', err);
    }
}

function setupKeybinds() {
    removeAllKeybinds();
    try{
    config = configManager.getConfig();
    keybinds = config.keybinds;

    globalShortcut.register(keybinds.recordMousePosition, () => {
        dialogManager.showMousePositionDialog();
        logger.write('utils', 'KeyManager > setupKeybinds', 'RecordMousePosition pressionado')
    });
    logger.write('utils', 'KeyManager > setupKeybinds', `RecordMousePosition configurado em ${keybinds.recordMousePosition}`);

    globalShortcut.register(keybinds.showPositions, () => {
        // TODO Lógica para mostrar posições
        logger.write('utils', 'KeyManager > setupKeybinds', 'ShowPositions pressionado');
    });
    logger.write('utils', 'KeyManager > setupKeybinds', `ShowPositions configurado em ${keybinds.showPositions}`);

    globalShortcut.register(keybinds.pauseResumeMacro, () => {
        // Lógica para pausar/resumir macro
        cache.pauseMacro("toggle");
        if (!cache.pauseMacro()) {
            click.executeMacro();
        }
        logger.write('utils', 'KeyManager > setupKeybinds', 'PauseResumeMacro pressionado');
        logger.write('utils', 'KeyManager > setupKeybinds', `Macro: ${(cache.pauseMacro() ? "pausado" : "despausado")}`);
    });
    logger.write('utils', 'KeyManager > setupKeybinds', `PauseResumeMacro configurado em ${keybinds.pauseResumeMacro}`);

    globalShortcut.register(keybinds.pauseResumeMouseReading, () => {
        cache.pauseReading("toggle");
        logger.write('utils', 'KeyManager > setupKeybinds', 'PauseResumeMouseReading pressionado');
        logger.write('utils', 'KeyManager > setupKeybinds', `Leitura do Mouse: ${(cache.pauseReading() ? "pausado" : "despausado")}`);
    });
    logger.write('utils', 'KeyManager > setupKeybinds', `PauseResumeMouseReading configurado em ${keybinds.pauseResumeMouseReading}`);

    globalShortcut.register(keybinds.exit, () => {
        require('../../index').quit();
        logger.write('utils', 'KeyManager > setupKeybinds', 'Exit pressionado');
    });
    logger.write('utils', 'KeyManager > setupKeybinds', `Exit configurado em, ${keybinds.exit}`);
    } catch(err) {
        logger.writeError('utils','KeyManager > setupKeybinds','Erro ao definir teclas de atalho', err);
    }
}

module.exports = {
    setupKeybinds,
    removeAllKeybinds,
}