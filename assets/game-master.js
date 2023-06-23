class GameMaster {
    constructor() {
        this.hackerOutput = document.querySelector('#hacker-output');
        this.hackerWssid = document.querySelector('#hacker-wssid');
        this.hackerIp = document.querySelector('#hacker-ip');
        this.hackerMac = document.querySelector('#hacker-mac');
        this.hackerPackets = document.querySelector('#hacker-packets');
        this.mainOutput = document.querySelector('#main-output');
        this.mainInput = document.querySelector('#main-input');
        this.terminalMain = document.querySelector('#terminal-main');
        this.mainPrefix = document.querySelector('#main-prefix');

        this.init();
    }

    init() {
        this.mainPrefix.style.display = 'none';
        this.generateHackerText(false);
        setInterval(() => this.generateHackerText(false), 1000);
        this.generateHackerInformation();
        setInterval(() => this.generateHackerInformation(), 1000);
        this.setupEventListeners();
        this.runCommands();
    }

    generateHackerText(color) {
        const getRandomString = () => Math.random().toString(36).substring(2, 10);

        let text = Array.from({ length: 100 }, getRandomString).join(' ');

        if (color) {
            const redIndex = Math.floor(Math.random() * 100);
            const redText = text.substring(redIndex * 10, redIndex * 10 + 10);
            text =
                text.substring(0, redIndex * 10) +
                `<span style="color: red;">${redText}</span>` +
                text.substring(redIndex * 10 + 10);
        }

        this.hackerOutput.innerHTML = text;
        this.hackerOutput.scrollTop = this.hackerOutput.scrollHeight;
    }

    generateHackerInformation() {
        const getRandomIPSegment = () => Math.floor(Math.random() * 255);
        const getRandomMacSegment = () =>
            Math.random().toString(36).substring(2, 5);

        this.hackerWssid.innerHTML = Math.random().toString(36).substring(2, 10);
        this.hackerIp.innerHTML = Array.from({ length: 4 }, getRandomIPSegment).join('.');
        this.hackerMac.innerHTML = Array.from({ length: 6 }, getRandomMacSegment).join(':');
        this.hackerPackets.innerHTML = Math.floor(Math.random() * 1000000);
    }

    terminalAppend(text) {
        const newLine = document.createElement('div');
        newLine.append(text);
        this.mainOutput.append(newLine);
        this.mainOutput.scrollTop = this.mainOutput.scrollHeight;
    }

    setupEventListeners() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Backspace' || event.key === 'Delete') {
                this.mainInput.innerText = this.mainInput.innerText.slice(0, -1);
                return;
            }

            this.generateHackerText(true);
            this.terminalMain.scrollTop = this.terminalMain.scrollHeight;
            this.mainOutput.scrollTop = this.mainOutput.scrollHeight;
        }, false);

        document.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                const command = this.mainInput.innerText.trim();

                if (command === 'clear') {
                    this.mainOutput.innerHTML = '';
                } else if (command === 'ls') {
                    this.terminalAppend(command);
                    this.terminalAppend('hackerman.sh\r\npasswords.txt\r\ninject.exe.pdf');
                } else if (command === 'cat passwords.txt') {
                    this.terminalAppend(command);
                    this.terminalAppend('backdoor:123456;judy:cats1965;admin:password;greg:greg123');
                } else if (command === 'help' || command === 'h' || command === '?') {
                    this.terminalAppend(command);
                    this.terminalAppend('clear - clear the terminal');
                    this.terminalAppend('ls - list files');
                    this.terminalAppend('help - show this help');
                } else if (command.startsWith('echo ')) {
                    this.terminalAppend(command);
                    this.terminalAppend(command.substring(5));
                } else {
                    this.terminalAppend('command not found: ' + command);
                }

                this.mainInput.innerText = '';
                this.mainOutput.scrollTop = this.mainOutput.scrollHeight;
                return;
            }

            const charCode = event.keyCode || event.which;

            if ((charCode >= 32 && charCode <= 126) || !event.shiftKey) {
                this.mainInput.append(event.key);
            }

            this.mainOutput.scrollTop = this.mainOutput.scrollHeight;
        }, false);
    }

    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async runCommands() {
        await this.delay(1000);
        this.terminalAppend('./hackerman.sh --vpn daddy');

        await this.delay(1000);
        this.terminalAppend('Cooking...done');

        await this.delay(1000);
        const span = document.createElement('span');
        span.classList.add('text-red');
        span.append('Unauthorized access detected!');
        this.terminalAppend(span);

        await this.delay(2000);
        this.terminalAppend('Hacking the system...done');

        await this.delay(4000);
        this.terminalAppend('Authorization override...done');

        await this.delay(1000);
        this.terminalAppend('Access granted!');
        this.mainPrefix.style.display = 'inline-block';
    }
}

const gameMaster = new GameMaster();
