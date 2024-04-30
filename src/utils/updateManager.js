const fetch = require('node-fetch');
const packageversion = require('../../package.json').version
const cache = require('../configs/cache');

let currentVersion = undefined;
let isUpdated = undefined;

function getCurrentVersion() {
    currentVersion = `BETA-${packageversion}`;
    return currentVersion
}

async function getGitData(repository){
    if(repository == undefined) return console.log("[UPDATE MANAGER > getGitData]: URL invalido ou ausente.");
    console.log(`[UPDATE MANAGER > getGitData] Solicitando informacoes de ${repository} a API do GitHub`);

    try{
    const response = await fetch(repository);
    const data = await response.json();
        if (response.ok) {
            console.log("[UPDATE MANAGER > getGitData] Dados recebidos com sucesso de", repository);
            return data;
        } else {
            return undefined
        }
    } catch(error) {
        console.log("[UPDATE MANAGER > getGitData] Ocorreu um erro ao solicitar informacoes do repositorio", error);
        return undefined
    }
}


async function checkUpdates() {
    currentVersion = getCurrentVersion();
    const data = await getGitData(cache.gitRep);

    if (data != undefined) {
        console.log("[UPDATE MANAGER > checkUpdates]: Checando versao")
        let latestVersion = data.tag_name;
        console.log("[UPDATE MANAGER > checkUpdates]: Ultima versao:", latestVersion, "Versao atual:", currentVersion);
            if (latestVersion !== currentVersion) {
                isUpdated = false;
                console.log("[UPDATE MANAGER > checkUpdates]: UMA NOVA VERSAO ESTAO DISPONIVEL!");
                return isUpdated;

        } else {
            isUpdated = true;
            console.log("[UPDATE MANAGER > checkUpdates]: VOCE ESTA EXECUTANDO A ULTIMA VERSAO!");
            return isUpdated;
        }
    } else {
        console.log("[UPDATE MANAGER > checkUpdates]: Nao foi possivel verificar as atualizacoes, voce deve estar sobre ratelimit, sem internet ou o repositorio nao existe mais.")
        isUpdated = undefined;
        return  isUpdated;
    }
  }

  module.exports = {
    checkUpdates
  }