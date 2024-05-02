const { ipcRenderer } = require("electron");

window.addEventListener('DOMContentLoaded', () => {
  // Enviar mensagem IPC para o processo principal
  ipcRenderer.send('request-config');
});

ipcRenderer.on('config-response', (event, configs) => {
  const keybinds = configs.keybinds;
  const coordinates = configs.clickPositions;
  console.log(coordinates)

  // Atualizar os valores dos campos de entrada com os keybinds recebidos
  document.querySelectorAll('.input-section').forEach((input) => {
      const fieldName = input.id;
      input.value = keybinds[fieldName] || ''; // Definir valor padrão se não houver keybind para o campo
  });

  // Atualizar os valores dos campos de coordenadas
  Object.entries(coordinates).forEach(([coordName, coordValues]) => {
    console.log(coordName, coordValues);
      const coordXInput = document.getElementById(`${coordName}X`);
      const coordYInput = document.getElementById(`${coordName}Y`);
      const coordButtonSelect = document.getElementById(`${coordName}Button`);

      if (coordXInput && coordYInput && coordButtonSelect) {
          coordXInput.value = coordValues.x || '';
          coordYInput.value = coordValues.y || '';
          coordButtonSelect.value = coordValues.button || '0';
      }
  });
});

document.querySelector('.save-button').addEventListener('click', () => {
    // Criar um objeto com as novas teclas a partir dos valores dos campos de entrada
    const keybinds = {
      recordMousePosition: document.getElementById('recordMousePosition').value,
      showPositions: document.getElementById('showPositions').value,
      pauseResumeMacro: document.getElementById('pauseResumeMacro').value,
      pauseResumeMouseReading: document.getElementById('pauseResumeMouseReading').value,
      exit: document.getElementById('exit').value
    };

    const clickPositions = {
      startQueue: {
        x: document.getElementById('startQueueX').value,
        y: document.getElementById('startQueueY').value,
        button: document.getElementById('startQueueButton').value
      },
      acceptMatch: {
        x: document.getElementById('acceptMatchX').value,
        y: document.getElementById('acceptMatchY').value,
        button: document.getElementById('acceptMatchButton').value
      },
      closeError1: {
        x: document.getElementById('closeError1X').value,
        y: document.getElementById('closeError1Y').value,
        button: document.getElementById('closeError1Button').value
      },
      closeError2: {
        x: document.getElementById('closeError2X').value,
        y: document.getElementById('closeError2Y').value,
        button: document.getElementById('closeError2Button').value
      },
      buyChampion1: {
        x: document.getElementById('buyChampion1X').value,
        y: document.getElementById('buyChampion1Y').value,
        button: document.getElementById('buyChampion1Button').value
      },
      buyChampion2: {
        x: document.getElementById('buyChampion2X').value,
        y: document.getElementById('buyChampion2Y').value,
        button: document.getElementById('buyChampion2Button').value
      },
      buyChampion3: {
        x: document.getElementById('buyChampion3X').value,
        y: document.getElementById('buyChampion3Y').value,
        button: document.getElementById('buyChampion3Button').value
      },
      buyChampion4: {
        x: document.getElementById('buyChampion4X').value,
        y: document.getElementById('buyChampion4Y').value,
        button: document.getElementById('buyChampion4Button').value
      },
      buyChampion5: {
        x: document.getElementById('buyChampion5X').value,
        y: document.getElementById('buyChampion5Y').value,
        button: document.getElementById('buyChampion5Button').value
      },
      walkToCenter: {
        x: document.getElementById('walkToCenterX').value,
        y: document.getElementById('walkToCenterY').value,
        button: document.getElementById('walkToCenterButton').value
      },
      selectCard: {
        x: document.getElementById('selectCardX').value,
        y: document.getElementById('selectCardY').value,
        button: document.getElementById('selectCardButton').value
      },
      quitMatch: {
        x: document.getElementById('quitMatchX').value,
        y: document.getElementById('quitMatchY').value,
        button: document.getElementById('quitMatchButton').value
      },
      playAgain: {
        x: document.getElementById('playAgainX').value,
        y: document.getElementById('playAgainY').value,
        button: document.getElementById('playAgainButton').value
      },
      extra1: {
        x: document.getElementById('extra1X').value,
        y: document.getElementById('extra1Y').value,
        button: document.getElementById('extra1Button').value
      },
      extra2: {
        x: document.getElementById('extra2X').value,
        y: document.getElementById('extra2Y').value,
        button: document.getElementById('extra2Button').value
      },
      extra3: {
        x: document.getElementById('extra3X').value,
        y: document.getElementById('extra3Y').value,
        button: document.getElementById('extra3Button').value
      }
    };
    
  
    ipcRenderer.send('update-settings', { keybinds, clickPositions });
    window.close();

  });