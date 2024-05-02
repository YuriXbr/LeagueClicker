const c = require('./colorcodes.js');
const fs = require('fs');
const path = require('path');

var today = new Date();
var data = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear() + '_' + today.getHours() + '-' + today.getMinutes() + '-' + today.getSeconds();
var logFolder = path.join('c:/LeagueClicker', 'logs', `logs ${data}`);

try {
    // Cria o diretório para os logs, caso não exista
    if (!fs.existsSync(logFolder)) {
        fs.mkdirSync(logFolder, { recursive: true });
    }

    // Nomes dos arquivos de log
    const logFiles = ['log.txt', 'utils.txt', 'errors.txt', 'pages.txt', 'updater.txt', 'config.txt', 'macro.txt'];

    // Criação dos arquivos de log dentro da subpasta
    logFiles.forEach(logFile => {
        fs.writeFile(path.join(logFolder, logFile), `LOG - ${data}\n=============================\n\n`, function (err) {
            if (err) throw err;
        });
    });

    // Funções de log
    const logger = {};
    logFiles.forEach(logFile => {
        logger[logFile.split('.')[0]] = fs.createWriteStream(path.join(logFolder, logFile), { flags: 'a' });
    });

    /**
     * @param {string} type - Tipo de log
     * @param {string} origin - Origem do log
     * @param {string} text - Texto para log
     */
    function write(type, origin, text) {
        try {
            Object.keys(logger).forEach(logType => {
                if (logType === type || logType === 'log') {
                    logger[logType].write(`${data} (${type}) :[${origin}] ${text}\n`);
                }
            });
            console.log(c.arrow + c.alerta(`[${origin}]: ${text}`));
    
        } catch (error) {
            console.error('Error occurred while writing log:', error);
        }
    }

    /**
     * @param {string} type - Tipo de log
     * @param {string} origin - Origem do log
     * @param {string} text - Texto para log
     */
    function writeConsole(origin, text) {
        console.log(c.arrow + c.alerta(`[${origin}]: ${text}`));
    }

    /**
     * @param {string} type - Em qual arquivo devera ser registrado
     * @param {string} origin - Origem do log
     * @param {string} text - Texto para log
     */
    function writeSilent(type, origin, text) {
        try {
            Object.keys(logger).forEach(logType => {
                if (logType === type || logType === 'log') {
                    logger[logType].write(`${data} (${type}) : [${origin}] ${text}\n`);
                }
            });
        } catch (error) {
            console.error('Error occurred while writing log:', error);
    
        }
    }

    /**
     * @param {string} type - Em qual arquivo devera ser registrado
     * @param {string} origin - Origem do erro
     * @param {string} errormessage - mensagem de erro personalziada
     * @param {any} error - Código de erro
     */
    function writeError(type, origin, errormessage, error) {
        try {
            Object.keys(logger).forEach(logType => {
                if (logType === type || logType === 'log' || logType == 'errors') {
                    logger[logType].write(`<<-=-=-=-=-=-=-=-=-=-=-=-ERROR-=-=-=-=-=-=-=-=-=-=-=->>\n`);
                    logger[logType].write(`ERROR: >> TRIGGER:  ${origin}\n`);
                    logger[logType].write(`ERROR: >> MESSAGE:  ${errormessage}\n`);
                    logger[logType].write(`ERROR: >> OUTPUT.:  ${error}\n`);
                    logger[logType].write(`\n`);
                }
            });
            console.log(c.error + c.verdebold(`${error}  \n`) + c.arrow + c.alerta(`${errormessage}\n`) + c.arrow + c.alerta(`ERROR GENERATED IN: ${origin}`));
    
        } catch (error) {
            console.error('Error occurred while writing error log:', error);
    
        }
    }

    /**
     * @param {number} number Number of Blank spaces
     */
    function blank(number){
        try {
            Object.keys(logger).forEach(logType => {
                if (logType === type || logType === 'log') {
                    nn = 0;
                    while(nn < number) {
                        logger.write(`\n`);
                        console.log('');
                        nn++
                    }
                }
            });
        } catch (error) {
            console.error('Error occurred while writing blank log:', error);
    
        }
        return;
    }

    function blankConsole(number){
        try {
            Object.keys(logger).forEach(logType => {
                if (logType === type || logType === 'log') {
                    nn = 0;
                    while(nn < number) {
                        console.log('');
                        nn++
                    }
                }
            });
        } catch (error) {
            console.error('Error occurred while writing blank console log:', error);
    
        }
        return;
    }

    module.exports = {
        write,
        writeConsole,
        writeSilent,
        writeError,
        blank,
        blankConsole
    }
} catch (error) {
    console.error('Error occurred while initializing logger:', error);
}
