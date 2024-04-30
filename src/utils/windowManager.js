const { BrowserWindow } = require('electron');
const path = require('path');

let settingsWindow;

function createSettingsWindow() {
    settingsWindow = new BrowserWindow({
        width: 500,
        height: 500,
        resizable: true, // Define a janela como não redimensionável
        x: 0, // Define a posição inicial X da janela para o canto esquerdo
        y: 0, // Define a posição inicial Y da janela para o topo
        autoHideMenuBar: true, // Oculta a barra de menu
        icon: '../assets/app.ico',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            webSecurity: false,
            allowRunningInsecureContent: true,
            scrollBounce: true,
        }
    });

    settingsWindow.loadFile(path.join(__dirname, '../pages/settings/index.html'));

    // Abrir o DevTools se estiver em ambiente de desenvolvimento
    if (process.env.NODE_ENV === 'development') {
        settingsWindow.webContents.openDevTools();
    }

    // Manipulador de evento para ocultar a janela ao fechá-la
    settingsWindow.on('close', (event) => {
        event.preventDefault();
        try{
        settingsWindow.hide();
        } catch {
            console.log("[windowManager > invoke]: Erro ao fechar a janela. de configurações.");
        }
    });
}

function invoke(page) {
    if (page === 'settings') {
        if (!settingsWindow) {
            createSettingsWindow();
        } else {
            settingsWindow.show();
        }
    }
}

function closeAllWindows() {
    if (settingsWindow) {
        settingsWindow.close();
        settingsWindow = null;
    }
    // Adicione mais janelas aqui, se necessário
}

module.exports = {
    invoke,
    closeAllWindows
};