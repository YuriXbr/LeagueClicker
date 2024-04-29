const {globalShortcut} = require('electron');
const cache = require('../configs/cache')
const click = require('./mouseManager');
const dialogManager = require('./dialogManager');

function removeAllKeybinds() {
    globalShortcut.unregisterAll();
    console.log("[KeyManager > removeAllKeybinds]: TODOS atalhos removidos.")
}

function setupKeybinds() {
    removeAllKeybinds();
    config = require('c:/LeagueClicker/config.json');
    keybinds = config.keybinds;

    globalShortcut.register(keybinds.recordMousePosition, () => {
        dialogManager.showMousePositionDialog();
        console.log("[KeyManager > setupKeybinds]: ", 'RecordMousePosition shortcut triggered');
    });
    console.log("[KeyManager > setupKeybinds]: ", 'RecordMousePosition configurado em', keybinds.recordMousePosition);

    globalShortcut.register(keybinds.showPositions, () => {
        // TODO Lógica para mostrar posições
        console.log("[KeyManager > setupKeybinds]: ", 'ShowPositions shortcut triggered');
    });
    console.log("[KeyManager > setupKeybinds]: ", 'ShowPositions configurado em', keybinds.showPositions);

    globalShortcut.register(keybinds.pauseResumeMacro, () => {
        // Lógica para pausar/resumir macro
        cache.pauseMacro("toggle");
        if (!cache.pauseMacro()) {
            click.executeMacro();
        }
        console.log("[KeyManager > setupKeybinds]: ", 'PauseResumeMacro shortcut triggered');
        console.log("[KeyManager > setupKeybinds]: ", "    " + (cache.pauseMacro() ? "pausado" : "despausado") + "\n\n");
    });
    console.log("[KeyManager > setupKeybinds]: ", 'PauseResumeMacro configurado em', keybinds.pauseResumeMacro);

    globalShortcut.register(keybinds.pauseResumeMouseReading, () => {
        cache.pauseReading("toggle");
        console.log("[KeyManager > setupKeybinds]: ", 'PauseResumeMouseReading shortcut triggered');
        console.log("[KeyManager > setupKeybinds]: ", "    " + (cache.pauseReading() ? "pausado" : "despausado") + "\n\n");
    });
    console.log("[KeyManager > setupKeybinds]: ", 'PauseResumeMouseReading configurado em', keybinds.pauseResumeMouseReading);

    globalShortcut.register(keybinds.exit, () => {
        require('../../index').quit();
        console.log("[KeyManager > setupKeybinds]: ", 'Exit shortcut triggered');
    });
    console.log("[KeyManager > setupKeybinds]: ", 'Exit configurado em', keybinds.exit);
}

module.exports = {
    setupKeybinds,
    removeAllKeybinds,
}