const { mouse } = require("@nut-tree/nut-js");
const cache = require("../configs/cache");
const logger = require('./logManager');

async function singleClick(x,y,button) {
    
    if(x == null || y == null) return logger.write('macro', 'MouseManager > singleClick', "Impossivel clicar na posicao null")
    await mouse.move({ x, y });
    await mouse.click(button);

}

async function getMousePosition(print) {
    logger.write('macro', 'MouseManager > getMousePosition', "Solicitando coordenadas do mouse");
    const pos = await mouse.getPosition();
    if (print) {
        logger.writeConsole('MouseManager > getMousePosition', `Mouse: X: ${pos.x} | Y: ${pos.y}`);
    }
    return pos;
}

async function executeMacro() {
    let config = require("c:/LeagueClicker/config.json");

    for (const position in config.clickPositions) {
        if (cache.pauseMacro()) return;

        if (config.clickPositions.hasOwnProperty(position)) {
            let { x, y, button } = config.clickPositions[position];

            // Verificar se x e y são strings e convertê-los em números inteiros se necessário
            if (typeof x === "string") {
                x = parseInt(x, 10);
            }
            if (typeof y === "string") {
                y = parseInt(y, 10);
            }

            // Verificar se o valor de button é uma string e convertê-lo em número inteiro, se necessário
            if (typeof button === "string") {
                button = parseInt(button, 10);
            }

            // Verificar se os valores são válidos e executar o clique do mouse
            if (!isNaN(x) && !isNaN(y) && (button >= 0 && button <= 2)) {
                logger.write('macro', 'MouseManager > executeMacro', `Movendo o mouse para posição: (${x}, ${y})`);
                await mouse.move({ x, y });
                logger.write('macro', 'MouseManager > executeMacro', `Executando clique em: (${x}, ${y}) com botão ${button}`);
                await mouse.click(button);
                await delay(config.config.macroSleepTime); // Esperar o tempo especificado entre os cliques
            }
        }
    }

    if (!cache.pauseMacro()) return executeMacro();
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    executeMacro,
    singleClick,
    getMousePosition
}