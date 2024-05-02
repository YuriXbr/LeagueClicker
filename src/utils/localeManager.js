const { app } = require('electron')
const fs = require('fs');
const path = require('path')
const configManager = require('./configManager');
const logger = require("./logManager")


async function setupLocales() {
    config = configManager.getConfig();

    nativeLoc = app.getLocale();
    if (config.config.language != undefined && config.config.language != null) {
        let _dir = await fs.existsSync(path.join(__dirname, "../", "locales", `${config.config.language}.json`));
        if (_dir) {
            logger.write('utils', 'LocaleManager', `localizacao ja configurada, carregando dados de ${config.config.language}.json...`)
            lang = require(path.join(__dirname, "../", "locales", `${config.config.language}.json`));
            return config.config.language;
        } else {
            try {
                logger.write('utils', 'LocaleManager' `localizacao não configurada ou invalida, buscando lingua do computador do usuario...`)
                lang = require(path.join(__dirname, "../", "locales", `${nativeLoc}.json`));
                logger.write('utils', 'LocaleManager' `Localizacao encontrada - ${nativeLoc}`);
                // Atualiza a linguagem no arquivo de configurações
                config.config.language = nativeLoc;
                // Escreve as alterações no arquivo de configurações
                fs.writeFileSync(configManager.configPath, JSON.stringify(config, null, 4), 'utf-8');

            } catch (err) {
                logger.writeError('utils', 'localeManager', `localizacao do usuario (nativeLoc) não suportada, utilizando ingles.`, 'invalidLocation' )
                lang = require(path.join(__dirname, "../", "locales", `en-US.json`));
                // Atualiza a linguagem no arquivo de configurações
                config.config.language = "en-US";
                // Escreve as alterações no arquivo de configurações
                fs.writeFileSync(configManager.configPath, JSON.stringify(config, null, 4), 'utf-8');
            }

            return config.config.language
        }
    } else {
        try {
            logger.write('utils', 'LocaleManager' `localizacao não configurada ou invalida, buscando lingua do computador do usuario...`)
            lang = require(path.join(__dirname, "../", "locales", `${nativeLoc}.json`));
            console.log("localizacao encontrada", nativeLoc);
            // Atualiza a linguagem no arquivo de configurações
            config.config.language = nativeLoc;
            // Escreve as alterações no arquivo de configurações
            fs.writeFileSync(configManager.configPath, JSON.stringify(config, null, 4), 'utf-8');
            
        } catch (err) {
            logger.writeError('utils', 'localeManager', `localizacao do usuario (${nativeLoc}) não suportada, utilizando ingles.`, 'invalidLocation2' )
            lang = require(path.join(__dirname, "../", "locales", `en-US.json`));
            // Atualiza a linguagem no arquivo de configurações
            config.config.language = "en-US";
            // Escreve as alterações no arquivo de configurações
            fs.writeFileSync(configManager.configFilePath, JSON.stringify(config, null, 4), 'utf-8');
        }
        
            return config.config.language
    }
}
module.exports = {
    setupLocales
}