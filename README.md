# LEAGUE CLICKER
[portuguese version](https://github.com/YuriXbr/LeagueClicker/tree/main#portuguese-version)

> [!WARNING]
> This is a **BETA** version and can have bugs, please use [GitHub Issues](https://github.com/YuriXbr/LeagueClicker/issues) to report a bug

## Setup:
1. Go to [GitHub release page](https://github.com/YuriXbr/LeagueClicker/releases) and download the latest version.
2. Install the *LeagueClicker* using the `Setup.exe` file

## Usage:
Read this sections to find how to use App.<br />

### **First Time Using:**
> [!IMPORTANT]
> Open it using the executable created on your desktop, or find it on `%appdata%/local/LeagueClicker/LeagueClicker.exe`<br />

<br />

### **Default keybinds:**
> [!TIP]
> * **Record the position of your mouse:** `Control+R` | When pressed, show a dialog box with the X and Y coordinates of your mouse in the moment you pressed the keybind.<br />
> * **Show the cords. of your mouse:** `Control+F11` | (🚧 Under development)<br />
> * **Pause/Resume macro:** `F5` | Pause or resume the macro. Please read [this section](https://github.com/YuriXbr/LeagueClicker/blob/main/README.md#keybinds-issues) if a keybind dont work.<br />
> * **Pause/Resume mouse position reading:** `Control+F12` | Pause or resume the console output coordinates of the mouse (DevOnly)<br />
> * **Exit:** `Control+F10` | Fully Closes the APP<br />
>
> **You can exit right clicking on the icon in  your system tray, and go to `exit`**

### **How to modify your configs:**
1. Go to `C:/LeagueClicker`, then Find config.json.
2. Update whatever you want, then save the file and restart the app.

* `__DevComments:` Comments left by the developer for the user.
* `config -> macroSleepTime:` Time between clicks.
* `config -> loopdelay:` Time between each app execution cycle, do not change if you dont know what you are doing.
* `clickPositions -> X: ` X coordinate of your mouse.
* `clickPositions -> Y: ` Y coordinate of your mouse.
* `clickPositions -> button: ` Button to be pressed by the macro. 0 = Left button, 1 = Middle button, 2 = Right button.

> [!CAUTION]
> **DO NOT REMOVE** `" ", {}, :` or any other symbol, only modify values or strings. <br />
> Example: `Exit: 'CommandOrControl+F10',` Can be changed to `Exit: 'F4',` Or whatever you want, but the `Exit: '',` should not be modified.

> [!TIP]
> If you broke your configs settings or want to hard reset it, just delete `configs.json` and restart the app.

### **Setting up keybinds:**
* To change a keybind, follow up the [How to modify your configs:](https://github.com/YuriXbr/LeagueClicker/blob/main/README.md#how-to-modify-your-configs) section. You can use `ANY key`, or `modifyKey+key` like `Control+Y` or `F6`, `F2` ... But note once LeagueClicker or another app redeems that key combatination, no other app will be able to register a global shortcut with this key combination. That means if League of Legends, Discord, or any app in your PC already taken this key, it wont work. And if LeagueClicker is using, others apps wont be able to use until you close the program. I recomend `control+ F...` keys.

### **Setting up macro coordinates**
1. Open the App and put your mouse in the desired position
2. Press `Control+R` on default keybinds, or your `RecordPosition` keybind to get your mouse coordinates. Do it again in all spots you want macro to click.
3. Right click on the LeagueClicker in your system tray, then go to `Exit`, it will prompt to you a save location for a .txt file with all your recorded coordinates, save it anywhere you want. Opening this file you will have a copy of all your coordinates, use the X and Y position to [modify your config file](https://github.com/YuriXbr/LeagueClicker/blob/main/README.md#how-to-modify-your-configs).
4. once you finished it, save the `config.json` and open the LeagueClicker again. <br />
Now you will be able to use your `pause/resume` key to start the macro.

## **Issues:**

### **THE MACRO DOESN'T STOP CLICKING**
> [!CAUTION]
> If you are on a League match, keybinds wont work because Riot sucks. use `Alt+Tab` to get off the League Window, then use your
>`pause/resume` key. If it dont work, use your TaskManager to close the app or restart your computer.

### **KeyBinds Issues:**
> [!NOTE]
> If other app already registered a global shortcut in the same keys, LeagueClicker wont be able to do this.

> [!NOTE]
> Use "Shift" or "CommandOrControl" as modify keys.

> [!IMPORTANT]
> Having other issue? Please create a ticket on [GitHub Issues](https://github.com/YuriXbr/LeagueClicker/issues) or send me a message on discord. `yuri.js`

<br /> <br /> <br /> <br /> <br />

# PORTUGUESE VERSION:

> [!WARNING]
> Esta é uma versão **BETA** e pode conter bugs. Use [GitHub Issues](https://github.com/YuriXbr/LeagueClicker/issues) para relatar um bug

## Configurar:
1. Acesse a [página de lançamento do GitHub](https://github.com/YuriXbr/LeagueClicker/releases) e baixe a versão mais recente.
2. Instale o *LeagueClicker* usando o arquivo `Setup.exe`

## Uso:
Leia estas seções para saber como usar o aplicativo.<br />

### **Primeira vez usando:**
> [!IMPORTANT]
> Abra-o usando o executável criado em seu desktop ou encontre-o em `%appdata%/local/LeagueClicker/LeagueClicker.exe`<br />

<br />

### **Atalhos de teclas padrão:**
> [!TIP]
> * **Registre a posição do mouse:** `Control+R` | Quando pressionado, mostra uma caixa de diálogo com as coordenadas X e Y do mouse no momento em que você pressionou a tecla.<br />
> * **Mostre as coordenadas do mouse:** `Control+F11` | (🚧 Em desenvolvimento)<br />
> * **Pausar/Retomar macro:** `F5` | Pause ou retome a macro. Por favor, leia [esta seção](https://github.com/YuriXbr/LeagueClicker/blob/main/README.md#como-modificar-suas-configura%C3%A7%C3%B5es) se um atalho de teclado não funcionar.<br />
> * **Pausar/retomar leitura da posição do mouse:** `Control+F12` | Pausar ou retomar as coordenadas de saída do console do mouse (DevOnly)<br />
> * **Sair:** `Control+F10` | Fecha totalmente o APP<br />
>
> **Você pode sair clicando com o botão direito no ícone na bandeja do sistema e ir para `exit`**

### **Como modificar suas configurações:**
1. Vá para `C:/LeagueClicker` e encontre config.json.
2. Atualize o que quiser, salve o arquivo e reinicie o aplicativo.

* `__DevComments:` Comentários deixados pelo desenvolvedor para o usuário.
* `config -> macroSleepTime:` Tempo entre cliques.
* `config -> loopdelay:` Tempo entre cada ciclo de execução do aplicativo, não altere se você não souber o que está fazendo.
* `clickPositions -> X: ` Coordenada X do seu mouse.
* `clickPositions -> Y: ` Coordenada Y do mouse.
* `clickPositions -> button: ` Botão a ser pressionado pela macro. 0 = botão esquerdo, 1 = botão do meio, 2 = botão direito.

> [!CAUTION]
> **NÃO REMOVA** `" ", {}, :` ou qualquer outro símbolo, apenas modifique valores ou strings. <br />
> Exemplo: `Exit: 'CommandOrControl+F10',` Pode ser alterado para `Exit: 'F4',` Ou o que você quiser, mas o `Exit: '',` não deve ser modificado.

> [!TIP]
> Se você quebrou suas configurações ou deseja redefini-lo, basta excluir `configs.json` e reiniciar o aplicativo.

### **Configurando atalhos de teclado:**
* Para alterar um atalho de teclado, siga a seção [Como modificar suas configurações:](https://github.com/YuriXbr/LeagueClicker/blob/main/README.md#como-modificar-suas-configura%C3%A7%C3%B5es). Você pode usar `QUALQUER botão` ou `modifyKey+key` como `Control+Y` ou `F6`, `F2` ... Mas observe que uma vez que LeagueClicker ou outro aplicativo resgata essa chave de combate, nenhum outro aplicativo será capaz de registre um atalho global com esta combinação de teclas. Isso significa que se League of Legends, Discord ou qualquer aplicativo em seu PC já tiver essa chave, ela não funcionará. E se o LeagueClicker estiver sendo usado, outros aplicativos não poderão ser usados até que você feche o programa. Eu recomendo as teclas `control+ F...`.

### **Configurando coordenadas macro**
1. Abra o App e coloque o mouse na posição desejada
2. Pressione `Control+R` nas teclas padrão ou a tecla `RecordPosition` para obter as coordenadas do mouse. Faça isso novamente em todos os locais onde deseja que a macro clique.
3. Clique com o botão direito no LeagueClicker na bandeja do sistema e vá em `Exit`, ele solicitará um local para salvar um arquivo .txt com todas as suas coordenadas gravadas, salve-o onde desejar. Abrindo este arquivo você terá uma cópia de todas as suas coordenadas, use a posição X e Y para [modificar seu arquivo de configuração](https://github.com/YuriXbr/LeagueClicker/blob/main/README.md#como-modificar-suas-configura%C3%A7%C3%B5es).
4. assim que terminar, salve o `config.json` e abra o LeagueClicker novamente. <br />
Agora você poderá usar a tecla `pause/resume` para iniciar a macro.

## **Problemas:**

### **A MACRO NÃO PARA DE CLICAR**
> [!CAUTION]
> Se você estiver em uma partida do LoL, os atalhos de teclado não funcionarão porque a Riot é uma droga. use `Alt+Tab` para sair da janela da liga, então use seu
>tecla `pausar/continuar`. Se não funcionar, use o TaskManager para fechar o aplicativo ou reiniciar o computador.

### **Problemas de KeyBinds:**
> [!NOTE]
> Se outro aplicativo já registrou um atalho global nas mesmas teclas, o LeagueClicker não conseguirá fazer isso.

> [!NOTE]
> Use "Shift" ou "CommandOrControl" como teclas de modificação.

> [!IMPORTANT]
> Está tendo outro problema? Crie um ticket em [GitHub Issues](https://github.com/YuriXbr/LeagueClicker/issues) ou envie-me uma mensagem no discord. `yuri.js`
