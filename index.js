const { app, dialog } = require('electron');
if (require('electron-squirrel-startup')) app.quit();
const fs = require('fs');

const localeManager = require('./src/utils/localeManager.js');
const configManager = require('./src/utils/configManager.js');
const keyManager = require('./src/utils/keyManager.js');
const mouseManager = require('./src/utils/mouseManager.js');
const updater = require('./src/utils/updateManager.js');
const cache = require('./src/configs/cache.js')

async function setup() {
    configManager.setupConfig();
    localeManager.setupLocales();
    keyManager.setupKeybinds();
    require('./src/utils/trayManager.js').createTrayIcon();
    await updater.checkUpdates();
}

function loop() {
    setInterval(() => {
        if (!cache.pauseReading()) {
            mouseManager.getMousePosition(true)
        }



    }, config.config.loopdelay);
}


async function quit() {
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
            app.quit();
        }
    }).catch(err => {
        console.error('Erro ao abrir o diálogo de salvamento:', err);
    });

    app.quit();
}

app.on('ready', () => {
    setup();
    loop();
});

app.on('before-quit', (event) => {
    console.log("\n\n\nRecorded Positions:\n");
    cache._recordedPositions.forEach((pos, index) => {
        if(pos[0] != undefined) console.log(`index: ${index} ; X: ${pos[0]} Y: ${pos[1]}`);
    });
    
});



module.exports = {
    setup,
    loop,
    quit,
}