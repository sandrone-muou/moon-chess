const readline = require('readline');
const MoonChess = require('./game');
const AI = require('./ai');

// 创建命令行界面
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class GameCLI {
  constructor() {
    this.game = new MoonChess();
    this.ai = new AI(this.game);
    this.blinkInterval = null;
  }

  // 启动游戏
  start() {
    console.log('=== 月亮棋游戏 ===');
    console.log('游戏规则：');
    console.log('1. 玩家与电脑交替落子');
    console.log('2. 每方最多同时有3个棋子在棋盘上');
    console.log('3. 落第3子后，第1子开始闪烁');
    console.log('4. 落第4子后，第1子消失');
    console.log('5. 先连成一线（横、竖、对角线）者获胜');
    console.log('\n棋盘位置：');
    console.log('0 | 1 | 2');
    console.log('---------');
    console.log('3 | 4 | 5');
    console.log('---------');
    console.log('6 | 7 | 8');
    console.log('\n');

    this.game.initBoard();
    this.displayBoard();
    this.playTurn();
  }

  // 显示棋盘
  displayBoard() {
    const state = this.game.getGameState();
    const board = state.board;
    const playerBlinking = state.playerBlinkingMove;
    const computerBlinking = state.computerBlinkingMove;

    // 清空控制台
    console.clear();

    console.log('=== 月亮棋游戏 ===\n');

    // 显示棋盘
    for (let i = 0; i < 9; i += 3) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        const pos = i + j;
        let symbol = board[pos];
        
        if (symbol === 'player') {
          symbol = pos === playerBlinking ? 'P*' : 'P';
        } else if (symbol === 'computer') {
          symbol = pos === computerBlinking ? 'C*' : 'C';
        } else {
          symbol = pos;
        }
        
        row.push(symbol.toString().padStart(2));
      }
      console.log(row.join(' | '));
      if (i < 6) {
        console.log('---------');
      }
    }

    console.log('\n');

    // 显示游戏状态
    if (state.gameOver) {
      console.log(`游戏结束！${state.winner === 'player' ? '玩家' : '电脑'}获胜！`);
    } else {
      console.log(`当前回合：${state.currentPlayer === 'player' ? '玩家' : '电脑'}`);
      console.log(`玩家棋子数：${state.playerMoves.length}`);
      console.log(`电脑棋子数：${state.computerMoves.length}`);
      if (playerBlinking !== null) {
        console.log(`玩家第1子（位置${playerBlinking}）正在闪烁，下一子将消失`);
      }
      if (computerBlinking !== null) {
        console.log(`电脑第1子（位置${computerBlinking}）正在闪烁，下一子将消失`);
      }
    }
  }

  // 玩家回合
  playTurn() {
    const state = this.game.getGameState();

    if (state.gameOver) {
      this.askPlayAgain();
      return;
    }

    if (state.currentPlayer === 'player') {
      // 玩家回合
      rl.question('请输入落子位置（0-8）：', (answer) => {
        const position = parseInt(answer);
        
        if (isNaN(position) || position < 0 || position > 8) {
          console.log('输入无效，请输入0-8之间的数字！');
          this.playTurn();
          return;
        }

        if (!this.game.placeMove(position, 'player')) {
          console.log('该位置已被占用或游戏已结束，请重新输入！');
          this.playTurn();
          return;
        }

        this.displayBoard();
        setTimeout(() => {
          this.playTurn();
        }, 500);
      });
    } else {
      // 电脑回合
      console.log('电脑正在思考...');
      setTimeout(() => {
        this.ai.makeMove();
        this.displayBoard();
        setTimeout(() => {
          this.playTurn();
        }, 500);
      }, 1000);
    }
  }

  // 询问是否再玩一局
  askPlayAgain() {
    rl.question('是否再玩一局？（y/n）：', (answer) => {
      if (answer.toLowerCase() === 'y') {
        this.game.initBoard();
        this.displayBoard();
        this.playTurn();
      } else {
        console.log('游戏结束，再见！');
        rl.close();
      }
    });
  }
}

// 启动游戏
const gameCLI = new GameCLI();
gameCLI.start();