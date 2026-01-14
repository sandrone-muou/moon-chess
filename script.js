const lang = {
    zh: {
        gameTitle: '月亮棋',
        rulesTitle: '游戏规则',
        rule1: '1. 玩家与电脑交替落子',
        rule2: '2. 每方最多同时有3个棋子在棋盘上',
        rule3: '3. 落第3子后，第1子开始闪烁',
        rule4: '4. 落第4子后，第1子消失',
        rule5: '5. 先连成一线（横、竖、对角线）者获胜',
        scoreTitle: '分数',
        player: '玩家',
        computer: '哥伦比娅',
        playerTurn: '轮到玩家落子',
        computerTurn: '哥伦比娅思考中...',
        playerWin: '恭喜！',
        playerWinMsg: '玩家获胜！',
        computerWin: '游戏结束',
        computerWinMsg: '哥伦比娅获胜！',
        draw: '游戏结束',
        drawMsg: '平局！',
        resetBtn: '清空分数',
        restartBtn: '重置游戏',
        modalClose: '确定',
        langZh: '中文',
        langEn: 'English'
    },
    en: {
        gameTitle: 'Moon Chess',
        rulesTitle: 'Game Rules',
        rule1: '1. Players take turns placing pieces',
        rule2: '2. Each player can have at most 3 pieces on the board',
        rule3: '3. After placing the 3rd piece, the 1st piece starts to flash',
        rule4: '4. After placing the 4th piece, the 1st piece disappears',
        rule5: '5. The first to connect three in a row wins',
        scoreTitle: 'Score',
        player: 'Player',
        computer: 'Columbina Hyposelenia',
        playerTurn: 'Player\'s turn',
        computerTurn: 'Columbina Hyposelenia thinking...',
        playerWin: 'Congratulations!',
        playerWinMsg: 'Player wins!',
        computerWin: 'Game Over',
        computerWinMsg: 'Columbina Hyposelenia wins!',
        draw: 'Game Over',
        drawMsg: 'It\'s a tie!',
        resetBtn: 'Clear Score',
        restartBtn: 'Reset Game',
        modalClose: 'OK',
        langZh: '中文',
        langEn: 'English'
    }
};

class MoonChess {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'player';
        this.playerMoves = [];
        this.computerMoves = [];
        this.playerWins = 0;
        this.computerWins = 0;
        this.gameActive = true;
        this.currentLang = 'zh';
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.setupEventListeners();
        this.updateUI();
        this.updateStatus(lang[this.currentLang].playerTurn);
        
        const langBtns = document.querySelectorAll('.lang-btn');
        langBtns.forEach(btn => {
            if (btn.dataset.lang === this.currentLang) {
                btn.classList.add('active');
            }
        });
    }
    
    setupEventListeners() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                if (this.gameActive && this.board[index] === '' && this.currentPlayer === 'player') {
                    this.makeMove(index, 'player');
                }
            });
        });
        
        document.getElementById('reset-btn').addEventListener('click', () => {
            this.restartGame();
        });
        
        document.getElementById('restart-btn').addEventListener('click', () => {
            this.resetGame();
        });
        
        const langBtns = document.querySelectorAll('.lang-btn');
        langBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.dataset.lang;
                this.switchLanguage(lang);
            });
        });
        
        const modalClose = document.getElementById('modal-close');
        modalClose.addEventListener('click', () => {
            const modal = document.getElementById('win-modal');
            modal.classList.remove('active');
        });
    }
    
    makeMove(index, player) {
        this.board[index] = player;
        this.updateBoard();
        
        if (player === 'player') {
            this.playerMoves.push(index);
            this.checkPlayerPieces();
        } else {
            this.computerMoves.push(index);
            this.checkComputerPieces();
        }
        
        if (this.checkWin(player)) {
            this.handleWin(player);
            return;
        }
        
        if (this.checkDraw()) {
            this.handleDraw();
            return;
        }
        
        this.switchPlayer();
        
        if (this.currentPlayer === 'computer' && this.gameActive) {
            setTimeout(() => {
                this.computerMove();
            }, 500);
        }
    }
    
    checkPlayerPieces() {
        if (this.playerMoves.length === 3) {
            const firstMove = this.playerMoves[0];
            this.addFadeEffect(firstMove, 'player');
        } else if (this.playerMoves.length === 4) {
            const firstMove = this.playerMoves.shift();
            this.board[firstMove] = '';
            this.removeFadeEffect(firstMove);
            this.updateBoard();
        }
    }
    
    checkComputerPieces() {
        if (this.computerMoves.length === 3) {
            const firstMove = this.computerMoves[0];
            this.addFadeEffect(firstMove, 'computer');
        } else if (this.computerMoves.length === 4) {
            const firstMove = this.computerMoves.shift();
            this.board[firstMove] = '';
            this.removeFadeEffect(firstMove);
            this.updateBoard();
        }
    }
    
    addFadeEffect(index, player) {
        const cell = document.querySelector(`[data-index="${index}"]`);
        if (cell) {
            cell.classList.add('fade');
        }
    }
    
    removeFadeEffect(index) {
        const cell = document.querySelector(`[data-index="${index}"]`);
        if (cell) {
            cell.classList.remove('fade');
        }
    }
    
    computerMove() {
        const availableMoves = this.board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
        
        if (availableMoves.length > 0) {
            const move = this.getBestMove(availableMoves);
            this.makeMove(move, 'computer');
        }
    }
    
    getBestMove(availableMoves) {
        for (const move of availableMoves) {
            const boardCopy = [...this.board];
            boardCopy[move] = 'computer';
            if (this.checkWinCombination(boardCopy, 'computer')) {
                return move;
            }
        }
        
        for (const move of availableMoves) {
            const boardCopy = [...this.board];
            boardCopy[move] = 'player';
            if (this.checkWinCombination(boardCopy, 'player')) {
                return move;
            }
        }
        
        if (availableMoves.includes(4)) {
            return 4;
        }
        
        const cornerMoves = availableMoves.filter(move => [0, 2, 6, 8].includes(move));
        if (cornerMoves.length > 0) {
            return cornerMoves[Math.floor(Math.random() * cornerMoves.length)];
        }
        
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }
    
    checkWinCombination(board, player) {
        return this.winningCombinations.some(combination => {
            return combination.every(index => board[index] === player);
        });
    }
    
    checkWin(player) {
        return this.checkWinCombination(this.board, player);
    }
    
    checkDraw() {
        return this.board.every(cell => cell !== '');
    }
    
    handleWin(player) {
        this.gameActive = false;
        
        if (player === 'player') {
            this.playerWins++;
            document.getElementById('player-wins').textContent = this.playerWins;
            this.showModal(lang[this.currentLang].playerWin, lang[this.currentLang].playerWinMsg);
        } else {
            this.computerWins++;
            document.getElementById('computer-wins').textContent = this.computerWins;
            this.showModal(lang[this.currentLang].computerWin, lang[this.currentLang].computerWinMsg);
        }
    }
    
    handleDraw() {
        this.gameActive = false;
        this.showModal(lang[this.currentLang].draw, lang[this.currentLang].drawMsg);
    }
    
    showModal(title, message) {
        const modal = document.getElementById('win-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalMessage = document.getElementById('modal-message');
        
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        modal.classList.add('active');
    }
    
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'player' ? 'computer' : 'player';
        if (this.gameActive) {
            this.updateStatus(this.currentPlayer === 'player' ? lang[this.currentLang].playerTurn : lang[this.currentLang].computerTurn);
        }
    }
    
    switchLanguage(langCode) {
        this.currentLang = langCode;
        this.updateUI();
        
        const langBtns = document.querySelectorAll('.lang-btn');
        langBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === langCode) {
                btn.classList.add('active');
            }
        });
    }
    
    updateUI() {
        document.querySelector('.game-title').textContent = lang[this.currentLang].gameTitle;
        document.querySelector('.rules h3').textContent = lang[this.currentLang].rulesTitle;
        document.querySelectorAll('.rules p')[0].textContent = lang[this.currentLang].rule1;
        document.querySelectorAll('.rules p')[1].textContent = lang[this.currentLang].rule2;
        document.querySelectorAll('.rules p')[2].textContent = lang[this.currentLang].rule3;
        document.querySelectorAll('.rules p')[3].textContent = lang[this.currentLang].rule4;
        document.querySelectorAll('.rules p')[4].textContent = lang[this.currentLang].rule5;
        document.querySelector('.scoreboard h3').textContent = lang[this.currentLang].scoreTitle;
        document.querySelector('.player-score').innerHTML = `${lang[this.currentLang].player}: <span id="player-wins">${this.playerWins}</span>`;
        document.querySelector('.computer-score').innerHTML = `${lang[this.currentLang].computer}: <span id="computer-wins">${this.computerWins}</span>`;
        document.getElementById('reset-btn').textContent = lang[this.currentLang].resetBtn;
        document.getElementById('restart-btn').textContent = lang[this.currentLang].restartBtn;
        document.getElementById('modal-close').textContent = lang[this.currentLang].modalClose;
        
        if (this.gameActive) {
            this.switchPlayer();
        }
    }
    
    updateBoard() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            cell.textContent = '';
            cell.className = 'cell';
            
            if (this.board[index] === 'player') {
                cell.textContent = '○';
                cell.classList.add('player');
            } else if (this.board[index] === 'computer') {
                cell.textContent = '×';
                cell.classList.add('computer');
            }
            
            if ((this.playerMoves.length === 3 && this.board[index] === 'player' && index === this.playerMoves[0]) ||
                (this.computerMoves.length === 3 && this.board[index] === 'computer' && index === this.computerMoves[0])) {
                cell.classList.add('fade');
            }
        });
    }
    
    updateStatus(message) {
        document.getElementById('game-status').textContent = message;
    }
    
    resetGame() {
        this.board = Array(9).fill('');
        this.playerMoves = [];
        this.computerMoves = [];
        this.currentPlayer = 'player';
        this.gameActive = true;
        this.updateBoard();
        this.updateStatus('轮到玩家落子');
    }
    
    restartGame() {
        this.resetGame();
        this.playerWins = 0;
        this.computerWins = 0;
        document.getElementById('player-wins').textContent = '0';
        document.getElementById('computer-wins').textContent = '0';
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new MoonChess();
});
