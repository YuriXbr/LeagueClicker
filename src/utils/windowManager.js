const { BrowserWindow } = require('electron');
const path = require('path');
const logger = require('./logManager.js')

let settingsWindow;

function createSettingsWindow() {
    logger.write('utils', 'windowManager > createSettingsWindow', 'Criando janela de configuracoes')
    settingsWindow = new BrowserWindow({
        width: 500,
        height: 800,
        resizable: false, // Define a janela como não redimensionável
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

    // Manipulador de evento para ocultar a janela ao fechá-la
    settingsWindow.on('close', (event) => {
        event.preventDefault();
        try{
        if(settingsWindow != null || settingsWindow != undefined) {
            settingsWindow.hide();
            logger.write('utils', 'windowManager > on.close', 'Fechando janela de configuracoes')
        } 
        } catch(error) {
            logger.writeError('utils','WindowManager > invoke', 'Erro ao fechar a janela. de configurações.', error)
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