class MoonChessApp {
  constructor() {
    // 初始化游戏对象
    this.game = new MoonChess();
    this.ai = new AI(this.game);
    
    // 翻译数据
    this.translations = {
      zh: {
        title: '月亮棋游戏',
        'rules-title': '游戏规则：',
        rule1: '1. 玩家与哥伦比娅交替落子',
        rule2: '2. 每方最多同时有3个棋子在棋盘上',
        rule3: '3. 落第3子后，第1子开始闪烁',
        rule4: '4. 落第4子后，第1子消失',
        rule5: '5. 先连成一线（横、竖、对角线）者获胜',
        'current-turn': '当前回合：',
        player: '玩家',
        computer: '哥伦比娅',
        restart: '重新开始',
        'game-over': '游戏结束',
        'player-win': '玩家获胜！',
        'computer-win': '哥伦比娅获胜！',
        confirm: '确定'
      },
      en: {
        title: 'Moon Chess Game',
        'rules-title': 'Game Rules:',
        rule1: '1. Player and Columbina Hyposelenia take turns placing pieces',
        rule2: '2. Each side can have at most 3 pieces on the board at the same time',
        rule3: '3. After placing the 3rd piece, the 1st piece starts to blink',
        rule4: '4. After placing the 4th piece, the 1st piece disappears',
        rule5: '5. The first to form a line (horizontal, vertical, diagonal) wins',
        'current-turn': 'Current Turn:',
        player: 'Player',
        computer: 'Columbina Hyposelenia',
        restart: 'Restart',
        'game-over': 'Game Over',
        'player-win': 'Player wins!',
        'computer-win': 'Columbina Hyposelenia wins!',
        confirm: 'OK'
      }
    };
    
    // 当前语言
    this.currentLang = 'zh';
    
    // 获取DOM元素
    this.board = document.getElementById('board');
    this.cells = document.querySelectorAll('.cell');
    this.currentPlayerElement = document.getElementById('current-player');
    this.restartBtn = document.getElementById('restart-btn');
    this.modal = document.getElementById('modal');
    this.modalTitle = document.getElementById('modal-title');
    this.modalMessage = document.getElementById('modal-message');
    this.modalBtn = document.getElementById('modal-btn');
    this.zhBtn = document.getElementById('zh-btn');
    this.enBtn = document.getElementById('en-btn');
    
    // 初始化游戏
    this.init();
  }

  // 初始化游戏
  init() {
    // 重置游戏状态
    this.game.initBoard();
    
    // 更新界面
    this.updateBoard();
    this.updateGameInfo();
    this.translatePage();
    
    // 绑定事件
    this.bindEvents();
  }

  // 绑定事件
  bindEvents() {
    // 绑定棋盘格子点击事件
    this.cells.forEach(cell => {
      cell.addEventListener('click', () => {
        this.handleCellClick(cell);
      });
    });

    // 绑定重新开始按钮事件
    this.restartBtn.addEventListener('click', () => {
      this.init();
    });

    // 绑定模态框按钮事件
    this.modalBtn.addEventListener('click', () => {
      this.modal.classList.remove('show');
    });

    // 绑定语言切换按钮事件
    this.zhBtn.addEventListener('click', () => {
      this.switchLanguage('zh');
    });

    this.enBtn.addEventListener('click', () => {
      this.switchLanguage('en');
    });
  }

  // 切换语言
  switchLanguage(lang) {
    this.currentLang = lang;
    
    // 更新语言按钮状态
    this.zhBtn.classList.remove('active');
    this.enBtn.classList.remove('active');
    
    if (lang === 'zh') {
      this.zhBtn.classList.add('active');
    } else {
      this.enBtn.classList.add('active');
    }
    
    // 翻译页面
    this.translatePage();
    this.updateGameInfo();
  }

  // 翻译页面
  translatePage() {
    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(element => {
      const key = element.getAttribute('data-lang');
      if (this.translations[this.currentLang][key]) {
        element.textContent = this.translations[this.currentLang][key];
      }
    });
  }

  // 处理格子点击
  handleCellClick(cell) {
    const state = this.game.getGameState();
    
    // 检查游戏是否结束或是否轮到玩家
    if (state.gameOver || state.currentPlayer !== 'player') {
      return;
    }

    // 获取点击位置
    const index = parseInt(cell.dataset.index);
    
    // 尝试落子
    if (this.game.placeMove(index, 'player')) {
      // 更新界面
      this.updateBoard();
      this.updateGameInfo();
      
      // 检查游戏是否结束
      if (this.game.getGameState().gameOver) {
        this.showGameOver();
        return;
      }

      // 电脑回合（添加延迟以提升体验）
      setTimeout(() => {
        this.ai.makeMove();
        this.updateBoard();
        this.updateGameInfo();
        
        // 检查游戏是否结束
        if (this.game.getGameState().gameOver) {
          this.showGameOver();
        }
      }, 500);
    }
  }

  // 更新棋盘
  updateBoard() {
    const state = this.game.getGameState();
    const board = state.board;
    const playerBlinking = state.playerBlinkingMove;
    const computerBlinking = state.computerBlinkingMove;

    // 更新每个格子
    this.cells.forEach((cell, index) => {
      // 清空所有类
      cell.className = 'cell';
      
      // 添加相应的类
      if (board[index] === 'player') {
        cell.classList.add('player');
        if (index === playerBlinking) {
          cell.classList.add('blinking');
        }
      } else if (board[index] === 'computer') {
        cell.classList.add('computer');
        if (index === computerBlinking) {
          cell.classList.add('blinking');
        }
      }
    });
  }

  // 更新游戏信息
  updateGameInfo() {
    const state = this.game.getGameState();
    
    // 更新当前回合
    this.currentPlayerElement.textContent = state.currentPlayer === 'player' ? 
      this.translations[this.currentLang].player : 
      this.translations[this.currentLang].computer;
  }

  // 显示游戏结束
  showGameOver() {
    const state = this.game.getGameState();
    this.modalTitle.textContent = this.translations[this.currentLang]['game-over'];
    this.modalMessage.textContent = state.winner === 'player' ? 
      this.translations[this.currentLang]['player-win'] : 
      this.translations[this.currentLang]['computer-win'];
    this.modal.classList.add('show');
  }
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', () => {
  new MoonChessApp();
});