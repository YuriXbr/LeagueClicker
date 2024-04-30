const { app } = require('electron')
const fs = require('fs');
const path = require('path')
const configManager = require('./configManager');
config = require('c:/LeagueClicker/config.json');

async function setupLocales() {

    if (config.config.language != undefined && config.config.language != null) {
        let _dir = await fs.existsSync(path.join(__dirname, "../", "locales", `${config.config.language}.json`));
        if (_dir) {
            console.log(`[main > setupLocales]: localizacao ja configurada, carregando dados de ${config.config.language}.json...`);
            lang = require(path.join(__dirname, "../", "locales", `${config.config.language}.json`));
            return config.config.language;
        } else {
            try {
                console.log("[main > setupLocales > try1]: localizacao não configurada ou invalida, buscando lingua do computador do usuario...");
                lang = require(path.join(__dirname, "../", "locales", `${app.getLocale()}.json`));
                console.log("localizacao encontrada", app.getLocale());
                // Atualiza a linguagem no arquivo de configurações
                config.config.language = app.getLocale();
                // Escreve as alterações no arquivo de configurações
                fs.writeFileSync(configManager.configPath, JSON.stringify(config, null, 4), 'utf-8');

            } catch (err) {
                console.error("[ERROR > main > setupLocales > catch1]: localizacao do usuario não suportada, utilizando ingles.");
                lang = require(path.join(__dirname, "../", "locales", `en-US.json`));
                // Atualiza a linguagem no arquivo de configurações
                config.config.language = "en-US";
                // Escreve as alterações no arquivo de configurações
                fs.writeFileSync(configManager.configPath, JSON.stringify(config, null, 4), 'utf-8');
            }

            fs.cancel(configManager.configPath);
            return config.config.language
        }
    } else {
        try {
            console.log("[main > setupLocales > try2]: localizacao não configurada ou invalida, buscando lingua do computador do usuario...");
            lang = require(path.join(__dirname, "../", "locales", `${app.getLocale()}.json`));
            console.log("localizacao encontrada", app.getLocale());
            // Atualiza a linguagem no arquivo de configurações
            config.config.language = app.getLocale();
            // Escreve as alterações no arquivo de configurações
            fs.writeFileSync(configManager.configPath, JSON.stringify(config, null, 4), 'utf-8');
            
        } catch (err) {
            console.error("[ERROR > main > setupLocales > catch2]: localizacao do usuario não suportada, utilizando ingles.");
            lang = require(path.join(__dirname, "../", "locales", `en-US.json`));
            // Atualiza a linguagem no arquivo de configurações
            config.config.language = "en-US";
            // Escreve as alterações no arquivo de configurações
            fs.writeFileSync(configManager.configPath, JSON.stringify(config, null, 4), 'utf-8');
        }
        
        fs.cancel(configManager.configPath);
            return config.config.language
    }
}
module.exports = {
    setupLocales
}