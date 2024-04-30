const { ipcRenderer } = require("electron");

window.addEventListener('DOMContentLoaded', () => {
  // Enviar mensagem IPC para o processo principal
  ipcRenderer.send('request-config');
});

ipcRenderer.on('config-response', (event, keybinds) => {
  // Atualizar os valores dos campos de entrada com os keybinds recebidos
  console.log({keybinds})
  document.querySelectorAll('.input-section').forEach((input) => {
    const fieldName = input.id;
    input.value = keybinds.keybinds[fieldName] || ''; // Definir valor padrão se não houver keybind para o campo
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
  
    ipcRenderer.send('update-keybinds', keybinds);
    window.close();

  });