defaultconfig = {
    __DevComments: {
        textENUS: "Use this file to change the AutoClicker configurations, tutorial: https://github.com/YuriXbr/LeagueClicker/",
        textPTBR: "Utilize esse arquivo para configurar o autoclicker, tutorial: https://github.com/YuriXbr/LeagueClicker/" 
    },
    keybinds: {
        recordMousePosition: 'CommandOrControl+R',
        showPositions: 'CommandOrControl+F11',
        pauseResumeMacro: 'F5',
        pauseResumeMouseReading: 'CommandOrControl+F12',
        exit: 'CommandOrControl+F10',
    },
    config: {
        language: null,
        macroSleepTime: 5000,
        loopdelay: 100,
        leagueOnly: null,
        autoShutDown: false
    },
    clickPositions: {
        startQueue: { x: null, y: null, button: 0 },
        acceptMatch: { x: null, y: null, button: 0 },
        closeError1: { x: null, y: null, button: 0 },
        closeError2: { x: null, y: null, button: 0 },
        buyChampion1: { x: null, y: null, button: 0 },
        buyChampion2: { x: null, y: null, button: 0 },
        buyChampion3: { x: null, y: null, button: 0 },
        buyChampion4: { x: null, y: null, button: 0 },
        buyChampion5: { x: null, y: null, button: 0 },
        walkToCenter: { x: null, y: null, button: 0 },
        selectCard: { x: null, y: null, button: 0 },
        quitMatch: { x: null, y: null, button: 0 },
        playAgain: { x: null, y: null, button: 0 },
        extra1: { x: null, y: null, button: 0 },
        extra2: { x: null, y: null, button: 0 },
        extra3: { x: null, y: null, button: 0 }
    },
    shutDown: {
        hours: null,
        minutes: null,
        seconds: null,
        duration: null,
        checkInMatch: null,
        type: null
    },
    dashboard: {
        serverIP: null,
        serverPort: null,
        serverDNS: null,
        enableDashboard: false,
        dashBoardPassword: null,
        requirePassword: true,
        allowGlobalConnections: false
    },
    LCU: {
        LCUToken: null,
        LCUPort: null,
        LCUIp: null,
        LCUPassword: null
    },
    discordIntegration: {
        token: null,
        clientId: null,
        secret: null,
        ownerId: null,
        guildId: null
    },
    database: {
        db: null,
        ip: null,
        password: null,
        port: null,
        type: null
    },
    logs: {
        logPath: "c:/LeagueClicker/Logs",
        enableLogging: true,
        enableLogSave: true,
        logErros: true,
        logEvents: true,
        logWarnings: true,
        logDashboard: true,
        logOutputs: true,
    },
    dev: {
        consolePrint: false,
        errorPrint: false,
        enableEval: false,
        forceLang: false,
    },
    fileVersion: "2.0.0",
};

module.exports = {
    defaultconfig
}