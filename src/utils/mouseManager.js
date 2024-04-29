const { mouse } = require("@nut-tree/nut-js");
let config = require("c:/LeagueClicker/config.json");
const cache = require("../configs/cache");

async function singleClick(x,y,button) {
    if(x == null || y == null) return console.log("[SingleClick]: Impossivel Clickar na posição null");
    await mouse.move({ x, y });
    await mouse.click(button);

}

async function getMousePosition(print) {
    const pos = await mouse.getPosition();
    if (print) {
        console.log(pos);
    }
    return pos;
}

async function executeMacro() {
    for (const position in config.clickPositions) {
        if (cache.pauseMacro()) return;

        if (config.clickPositions.hasOwnProperty(position)) {
            const { x, y, button } = config.clickPositions[position];
            if (x !== null && y !== null) {
                console.log(`Moving mouse to position: (${x}, ${y})`);
                await mouse.move({ x, y });
                console.log(`Clicking at position: (${x}, ${y}) with button ${button}`);
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