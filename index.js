const { app, Menu, Tray, globalShortcut, dialog } = require('electron');
const { mouse } = require("@nut-tree/nut-js");
const fs = require('fs');
const path = require('path');
if (require('electron-squirrel-startup')) app.quit();

let tray = null;
let pauseMacro = true;
let pauseReading = true;
let recordedPositions = new Array(50).fill(null).map(() => new Array(2)); // Inicializa o array bidimensional
let recordedindex = 0;

const configFolderPath = 'C:/LeagueClicker/';
const configPath = path.join(configFolderPath, 'config.json');

function setup() {
    setupKeybinds();
    createTrayIcon();
}

function loop() {
    setInterval(() => {
        if (!pauseReading) {
            getMousePosition(true)
        }
    }, config.config.loopdelay);

}

async function executeMacro() {
    for (const position in config.clickPositions) {
        if (pauseMacro) {
            console.log('Macro paused');
            return; 
        }

        if (config.clickPositions.hasOwnProperty(position)) {
            const { x, y, button } = config.clickPositions[position];
            if (x !== null && y !== null) {
                console.log(`Moving mouse to position: (${x}, ${y})`);
                await mouse.move({ x, y });
                console.log(`Clicking at position: (${x}, ${y}) with button ${button}`);
                await mouse.click(button);
                await delay(config.config.MacroSleepTime); // Espera o tempo especificado entre os cliques
            }
        }
    }

    if(!pauseMacro) return executeMacro();
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let config = require('./src/modals/defaultConfig').defaultconfig;

function setupKeybinds() {
    // Verifica se o diretório de configuração existe, se não, cria
    if (!fs.existsSync(configFolderPath)) {
        fs.mkdirSync(configFolderPath);
    }

    // Verifica se o arquivo de configurações existe
    if (fs.existsSync(configPath)) {
        // Se existe, lê o arquivo e atualiza as configurações
        const configFile = fs.readFileSync(configPath, 'utf-8');
        config = JSON.parse(configFile);
    } else {
        // Se não existe, cria o arquivo com as configurações padrão
        fs.writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf-8');
    }

    // Definindo os atalhos de teclado
    globalShortcut.register(config.keybinds.RecordMousePosition, () => {
        showMousePositionDialog();
        console.log('RecordMousePosition shortcut triggered');
    });

    globalShortcut.register(config.keybinds.ShowPositions, () => {
        // TODO Lógica para mostrar posições
        console.log('ShowPositions shortcut triggered');
    });

    globalShortcut.register(config.keybinds.PauseResumeMacro, () => {
        // Lógica para pausar/resumir macro
        pauseMacro = !pauseMacro;
        if(!pauseMacro) {
            executeMacro();
        }
        console.log("    " + (pauseMacro ? "pausado" : "despausado") + "\n\n");
        console.log('PauseResumeMacro shortcut triggered');
    });

    globalShortcut.register(config.keybinds.PauseResumeMouseReading, () => {
        pauseReading = !pauseReading;
        console.log("    " + (pauseReading ? "pausado" : "despausado") + "\n\n");
    });

    globalShortcut.register(config.keybinds.Exit, () => {
        quit();
    });
}

function createTrayIcon() {
    tray = new Tray(path.join(__dirname, "src", "assets", "app.ico"));

    const contextMenu = Menu.buildFromTemplate([
        { label: `TECLAS DE ATALHO:`, type: 'normal' },
        { type: 'separator' },
        { label: `RecordMousePosition: ${config.keybinds.RecordMousePosition}`, type: 'normal' },
        { label: `ShowPositions: ${config.keybinds.ShowPositions}`, type: 'normal' },
        { label: `PauseResumeMacro: ${config.keybinds.PauseResumeMacro}`, type: 'normal' },
        { label: `PauseResumeMouseReading: ${config.keybinds.PauseResumeMouseReading}`, type: 'normal' },
        { label: `Exit: ${config.keybinds.Exit}`, type: 'normal' },
        { type: 'separator' },
        { label: 'PreviewClicks', type: 'submenu', submenu: [
            { label: `IniciarFila X ${config.clickPositions.IniciarFila.x} : Y ${config.clickPositions.IniciarFila.y}`, type: 'normal', },
            { label: `AceitarPartida X ${config.clickPositions.AceitarPartida.x} : Y ${config.clickPositions.AceitarPartida.y}`, type: 'normal', },
            { label: `FecharErro1 X ${config.clickPositions.FecharErro1.x} : Y ${config.clickPositions.FecharErro1.y}`, type: 'normal', },
            { label: `FecharErro2 X ${config.clickPositions.FecharErro2.x} : Y ${config.clickPositions.FecharErro2.y}`, type: 'normal', },
            { label: `ComprarLoja1 X ${config.clickPositions.ComprarLoja1.x} : Y ${config.clickPositions.ComprarLoja1.y}`, type: 'normal', },
            { label: `ComprarLoja2 X ${config.clickPositions.ComprarLoja2.x} : Y ${config.clickPositions.ComprarLoja2.y}`, type: 'normal', },
            { label: `AndarParaCentro X ${config.clickPositions.AndarParaCentro.x} : Y ${config.clickPositions.AndarParaCentro.y}`, type: 'normal', },
            { label: `SairDaPartida X ${config.clickPositions.SairDaPartida.x} : Y ${config.clickPositions.SairDaPartida.y}`, type: 'normal', },
            { label: `JogarNovamente X ${config.clickPositions.JogarNovamente.x} : Y ${config.clickPositions.JogarNovamente.y}`, type: 'normal', }
        ] },
        { label: 'Update KeyBinds', type: 'normal', click: () => { setupKeybinds(); } },
        { type: 'separator' },
        { label: 'Quit', type: 'normal', click: () => { quit(); } }
    ]);
    tray.setToolTip('Macro');
    tray.setContextMenu(contextMenu);
}

async function getMousePosition(print) {
    const pos = await mouse.getPosition();
    if (print) {
        console.log(pos);
    }
    return pos;
}

function showMousePositionDialog() {
    getMousePosition(true).then((pos) => {
        saveCachePosition(pos.x, pos.y);

        const message = `A posição do mouse é: ${pos.x}, ${pos.y}`;
        dialog.showMessageBox(null, {
            type: 'info',
            title: 'Posição do Mouse',
            message: message,
            buttons: ['FECHAR']
        });
    }).catch((error) => {
        console.error('Erro ao obter a posição do mouse:', error);
    });
}

function saveCachePosition(x, y) {
    recordedPositions[recordedindex][0] = x;
    recordedPositions[recordedindex][1] = y;
    recordedindex++;
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

app.on('ready', () => {
    setup();
    loop();
});

app.on('before-quit', (event) => {
    console.log("\n\n\nRecorded Positions:\n");
    recordedPositions.forEach((pos, index) => {
        if(pos[0] != undefined) console.log(`index: ${index} ; X: ${pos[0]} Y: ${pos[1]}`);
    });
    
});
