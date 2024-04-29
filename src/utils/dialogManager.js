const {dialog} = require('electron');
const mouseManager = require('./mouseManager');
const cache = require('../configs/cache');

function showMousePositionDialog() {
    mouseManager.getMousePosition(true).then((pos) => {
        cache.saveCachePosition(pos.x, pos.y);

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

module.exports = {
    showMousePositionDialog
}