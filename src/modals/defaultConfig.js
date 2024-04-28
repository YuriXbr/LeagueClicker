defaultconfig = {
    __DevComments: {
        textEN: "Use this file to change the AutoClicker configurations, tutorial: ",
        textPTBR: "Utilize esse arquivo para configurar o autoclicker, tutorial: " 
    },
    keybinds: {
        RecordMousePosition: 'CommandOrControl+R',
        ShowPositions: 'CommandOrControl+F11',
        PauseResumeMacro: 'F5',
        PauseResumeMouseReading: 'CommandOrControl+F12',
        Exit: 'CommandOrControl+F10',
    },
    config: {
        MacroSleepTime: 5000,
        loopdelay: 100
    },
    clickPositions: {
        IniciarFila: { x: null, y: null, button: 0 },
        AceitarPartida: { x: null, y: null, button: 0 },
        FecharErro1: { x: null, y: null, button: 0 },
        FecharErro2: { x: null, y: null, button: 0 },
        ComprarLoja1: { x: null, y: null, button: 0 },
        ComprarLoja2: { x: null, y: null, button: 0 },
        AndarParaCentro: { x: null, y: null, button: 0 },
        SairDaPartida: { x: null, y: null, button: 0 },
        JogarNovamente: { x: null, y: null, button: 0 }
    }
};

module.exports = {
    defaultconfig
}