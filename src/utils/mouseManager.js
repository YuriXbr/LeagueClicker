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
            const { x, y, button } = config.clickPositions[position];
            if (x !== null && y !== null && (button >= 0 && button <= 2) ) {
                logger.write('macro', 'MouseManager > executeMacro', `Movendo o mouse para posicao: (${x}, ${y})`)
                await mouse.move({ x, y });
                logger.write('macro', 'MouseManager > executeMacro', `Executando clique em: (${x}, ${y}) com botao ${button}`)
                await mouse.click(button);
                await delay(config.config.macroSleepTime); // Espera o tempo especificado entre os cliques
            }
        }
    }

    if(!cache.pauseMacro()) return executeMacro();
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    executeMacro,
    singleClick,
    getMousePosition
}