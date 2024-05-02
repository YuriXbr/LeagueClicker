const fetch = require('node-fetch');
const package = require('../../package.json')
const packageversion = package.version;
const cache = require('../configs/cache');
const dialogManager = require('./dialogManager');
const logger = require('./logManager');
let currentVersion = undefined;
let isUpdated = undefined;

function getCurrentVersion() {
    currentVersion = `BETA-${packageversion}`;
    return currentVersion
}

async function getGitData(repository){
    if(repository == undefined) return logger.write("utils","UPDATE MANAGER > getGitData","URL invalido ou ausente.");
    logger.write("utils","UPDATE MANAGER > getGitData",`Solicitando informacoes de ${repository} a API do GitHub`);

    try{
    const response = await fetch(repository);
    const data = await response.json();
        if (response.ok) {
            logger.write('utils',"UPDATE MANAGER > getGitData", `Dados recebidos com sucesso de ${repository}`);
            return data;
        } else {
            return undefined
        }
    } catch(error) {
        logger.writeError('utils',"[UPDATE MANAGER > getGitData]", "Ocorreu um erro ao solicitar informacoes do repositorio", error);
        return undefined
    }
}


async function checkUpdates() {
    currentVersion = getCurrentVersion();
    const data = await getGitData(cache.gitRep);

    if (data != undefined) {
        logger.write('utils','UPDATE MANAGER > checkUpdates', "Checando versao")
        let latestVersion = data.tag_name;
        logger.write('utils','UPDATE MANAGER > checkUpdates', `Ultima versao:, ${latestVersion} Versao atual: ${currentVersion}`)
            if (latestVersion !== currentVersion) {
                isUpdated = false;
                logger.write('utils','UPDATE MANAGER > checkUpdates', `UMA NOVA VERSAO ESTAO DISPONIVEL!`)
                dialogManager.genericTextDialogBox('warning',"NOVA VERSÃO DISPONIVEL", `UMA NOVA VERSÃO ESTÁ DISPONIVEL, BAIXE EM ${package.homepage}`);
                return isUpdated;

        } else {
            isUpdated = true;
            logger.write('utils','UPDATE MANAGER > checkUpdates', `VOCE ESTA EXECUTANDO A ULTIMA VERSAO!`)
            return isUpdated;
        }
    } else {
        logger.writeError('utils','UPDATE MANAGER > checkUpdates', "Nao foi possivel verificar as atualizacoes, voce deve estar sobre ratelimit, sem internet ou o repositorio nao existe mais.", 'data undefined');
        isUpdated = undefined;
        return  isUpdated;
    }
  }

  module.exports = {
    checkUpdates
  }