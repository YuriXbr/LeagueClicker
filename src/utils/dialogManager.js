const {dialog} = require('electron');
const mouseManager = require('./mouseManager');
const cache = require('../configs/cache');
const logger = require('./logManager')

/**
 * Cria uma caixa de dialogo simples com a posição do mouse do usuario no momento em que a função foi chamada
 */
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
        logger.writeError('utils','dialogManager > showMousePositionDialog', 'Erro ao obter a posicao do mouse', error);
    });
}

/**
 * Cria uma caixa de diálogo genérica.
 * @param {string} type - O tipo de caixa de diálogo.("none", "info", "error", "question" ou "warning").
 * @param {string} title - O título da caixa de diálogo.
 * @param {string} message - A mensagem a ser exibida na caixa de diálogo.
 * @param {string[]} [buttons] - Um array opcional de strings representando os botões da caixa de diálogo.
 * @param {Function} [clickHandler] - Uma função opcional associada ao clique no botão.
 */
function genericTextDialogBox(type, title, message, buttons, clickHandler) {
    logger.write('utils','dialogManager > genericTextDialogBox', `mostrando caixa de tipo ${type} com titulo ${title}, mensagem ${message} e botões ${[buttons]}`)
    try{
    const options = {
        type: type,
        title: title,
        message: message,
        buttons: buttons,
    };

    if (clickHandler) {
        options.buttonLabel = 'OK'; // Rótulo do botão padrão, se nenhum rótulo de botão for especificado
        options.defaultId = 0; // Índice padrão do botão, se nenhum índice padrão for especificado
    }

    dialog.showMessageBox(null, options)
        .then((result) => {
            // Verifica se há uma função de manipulador de clique e a chama com o índice do botão clicado
            if (clickHandler && result.response !== undefined) {
                clickHandler(result.response);
            }
        })
        .catch((error) => {
            logger.writeError('utils','dialogManager > showMessageBox', 'Erro ao processar os resultados', error);
        });
    } catch(error) {
        logger.writeError('utils','dialogManager > showMessageBox', 'Erro ao mostrar caixa de dialogo', error);
    }
}

module.exports = {
    showMousePositionDialog,
    genericTextDialogBox
}