const logger = require('../utils/logManager');

let _pauseMacro = true;
let _pauseReading = true;
let _recordedPositions = new Array(50).fill(null).map(() => new Array(2)); // Inicializa o array bidimensional
let recordedindex = 0;
let gitRep = 'https://api.github.com/repos/YuriXbr/LeagueClicker/releases/latest'


function pauseMacro(WriteEnable) {
    if(WriteEnable == "toggle") {
        _pauseMacro = !_pauseMacro;
        console.log(_pauseMacro);
        logger.write('utils','CACHE > pauseMacro', `Pedido de toggle recebido, o valor retornado e ${_pauseMacro}`);
        return _pauseMacro
    } else if (WriteEnable == true || WriteEnable == false) {
        _pauseMacro = WriteEnable;
        logger.write('utils','CACHE > pauseMacro', `Pedido de SET recebido, o valor retornado e ${_pauseMacro}`);
    }else {
        logger.write('utils','CACHE > pauseMacro', `Pedido de LEITURA recebido, o valor retornado e ${_pauseMacro}`);
        return _pauseMacro;
    }
}

function pauseReading(WriteEnable) {
    if(WriteEnable == "toggle") {
        _pauseReading = !_pauseReading;
        logger.write('utils','CACHE > pauseReading', `Pedido de toggle recebido, o valor retornado e ${_pauseReading}`);
        return _pauseReading
    } else if (WriteEnable == true || WriteEnable == false) {
        _pauseReading = WriteEnable;
        logger.write('utils','CACHE > pauseReading', `Pedido de SET recebido, o valor retornado e ${_pauseReading}`);
    }else {
        logger.write('utils','CACHE > pauseReading', `Pedido de LEITURA recebido, o valor retornado e ${_pauseReading}`);
        return _pauseReading;
    }
}

function saveCachePosition(x, y) {
    _recordedPositions[recordedindex][0] = x;
    _recordedPositions[recordedindex][1] = y;
    recordedindex++;
    return [_recordedPositions[recordedindex][0], _recordedPositions[recordedindex][1]]
}

module.exports = {
    pauseMacro,
    pauseReading,
    saveCachePosition,
    _recordedPositions,
    gitRep
}