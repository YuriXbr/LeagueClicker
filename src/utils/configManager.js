const fs = require('fs');
const path = require('path');
const configFolderPath = 'C:/LeagueClicker/';
const configFilePath = path.join(configFolderPath, 'config.json');
const defaultconfig = require('../modals/defaultConfig').defaultconfig;
let config;
const logger = require('./logManager');

async function setupConfig(){
    
    // Verifica se o diretório de configuração existe, se não, cria
    if (!fs.existsSync(configFolderPath)) {
        fs.mkdirSync(configFolderPath);
        logger.write('utils', 'configManager > setupConfig', 'Diretorio de configuracoes nao encontrado, criando...')
    }
    logger.write('utils', 'configManager > setupConfig', 'Atualizando Configuracoes...');

    // Verifica se o arquivo de configurações existe
    if (fs.existsSync(configFilePath)) {
        // Se existe, lê o arquivo e atualiza as configurações

        config = require('c:/LeagueClicker/config.json');
        logger.write('utils', 'configManager > setupConfig', `Versao do arquivo de configuracoes atual: ${config.fileVersion} | Versao do arquivo default: ${defaultconfig.fileVersion}`);
        if(config.fileVersion == defaultconfig.fileVersion) {
            console.log({config})
            return logger.write('utils', 'configManager > setupConfig', 'Configuracoes atualizadas.');
        } else {
            fs.writeFileSync(configFilePath, JSON.stringify(defaultconfig, null, 4), 'utf-8');
            return logger.write('utils', 'configManager > setupConfig', 'Configuracoes desatualizadas, redefinindo para o padrao...');
        }
    } else {
        // Se não existe, cria o arquivo com as configurações padrão
        fs.writeFileSync(configFilePath, JSON.stringify(defaultconfig, null, 4), 'utf-8');
        return logger.write('utils', 'configManager > setupConfig', 'Configuracoes nao encontradas, redefinindo para o padrao...');
    }
}

function getConfig() {
    logger.write('utils', 'configManager > getConfig', 'Pedido de carregamento de configuracoes recebido');
    config = require('c:/LeagueClicker/config.json');
    return config;
}

async function updateToFile(local, parametros) {
    try {
        let config = getConfig(); // Supondo que você tenha uma função getConfig() para obter as configurações existentes

        if (local === 'keybinds' || local === 'clickPositions') {
            config[local] = parametros;
            fs.writeFileSync(configFilePath, JSON.stringify(config, null, 4), 'utf-8');
        } else {
            throw new Error('Local inválido para atualização.');
        }
    } catch (error) {
        console.error('Erro ao atualizar arquivo de configuração:', error);
    }
}


module.exports = {
    setupConfig,
    updateToFile,
    config,
    configFilePath,
    configFolderPath,
    getConfig
}