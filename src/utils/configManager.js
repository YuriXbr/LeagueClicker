const fs = require('fs');
const path = require('path')

const configFolderPath = 'C:/LeagueClicker/';
const configPath = path.join(configFolderPath, 'config.json');
let config = require('../modals/defaultConfig').defaultconfig;

function setupConfig(){
    // Verifica se o diretório de configuração existe, se não, cria
    if (!fs.existsSync(configFolderPath)) {
        fs.mkdirSync(configFolderPath);
    }

    // Verifica se o arquivo de configurações existe
    if (fs.existsSync(configPath)) {
        // Se existe, lê o arquivo e atualiza as configurações
        const configFile = fs.readFileSync(configPath, 'utf-8');
        console.log("[configManager > setupConfig]: Versao do arquivo de configuracoes:", config.fileVersion,);
        console.log("[configManager > setupConfig]: Versao do arquivo default:", require(configPath).fileVersion)
        if(config.fileVersion == require(configPath).fileVersion) {
            config = JSON.parse(configFile);
            return console.log("[configManager > setupConfig]: Configuracoes atualizadas.");
        } else {
            fs.writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf-8');
            return console.log("[configManager > setupConfig]: Configuracoes desatualizadas, redefinindo.");
        }
    } else {
        // Se não existe, cria o arquivo com as configurações padrão
        fs.writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf-8');
        return console.log("[configManager > setupConfig]: Configurações não encontradas, redefinindo.");
    }
}

module.exports = {
    setupConfig,
    config,
    configPath,
    configFolderPath
}