class MoonChess {
  constructor() {
    this.board = Array(9).fill(null); // 3x3棋盘
    this.playerMoves = []; // 玩家的棋子位置历史
    this.computerMoves = []; // 电脑的棋子位置历史
    this.currentPlayer = 'player'; // 当前玩家
    this.gameOver = false; // 游戏是否结束
    this.winner = null; // 获胜者
  }

  // 初始化棋盘
  initBoard() {
    this.board = Array(9).fill(null);
    this.playerMoves = [];
    this.computerMoves = [];
    this.currentPlayer = 'player';
    this.gameOver = false;
    this.winner = null;
  }

  // 检查位置是否可用
  isPositionAvailable(position) {
    return this.board[position] === null;
  }

  // 落子
  placeMove(position, player) {
    if (!this.isPositionAvailable(position) || this.gameOver) {
      return false;
    }

    // 记录落子
    this.board[position] = player;
    if (player === 'player') {
      this.playerMoves.push(position);
      // 检查是否需要移除最早的棋子
      if (this.playerMoves.length > 3) {
        const oldestMove = this.playerMoves.shift();
        this.board[oldestMove] = null;
      }
    } else {
      this.computerMoves.push(position);
      // 检查是否需要移除最早的棋子
      if (this.computerMoves.length > 3) {
        const oldestMove = this.computerMoves.shift();
        this.board[oldestMove] = null;
      }
    }

    // 检查是否获胜
    if (this.checkWin(player)) {
      this.gameOver = true;
      this.winner = player;
    }

    // 切换玩家
    this.currentPlayer = this.currentPlayer === 'player' ? 'computer' : 'player';
    return true;
  }

  // 检查是否获胜
  checkWin(player) {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // 横向
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // 纵向
      [0, 4, 8], [2, 4, 6]             // 对角线
    ];

    for (const pattern of winPatterns) {
      if (pattern.every(pos => this.board[pos] === player)) {
        return true;
      }
    }
    return false;
  }

  // 获取闪烁的棋子位置
  getBlinkingMove(player) {
    const moves = player === 'player' ? this.playerMoves : this.computerMoves;
    return moves.length === 3 ? moves[0] : null;
  }

  // 获取当前棋盘状态
  getBoard() {
    return [...this.board];
  }

  // 获取游戏状态
  getGameState() {
    return {
      board: this.getBoard(),
      currentPlayer: this.currentPlayer,
      gameOver: this.gameOver,
      winner: this.winner,
      playerMoves: [...this.playerMoves],
      computerMoves: [...this.computerMoves],
      playerBlinkingMove: this.getBlinkingMove('player'),
      computerBlinkingMove: this.getBlinkingMove('computer')
    };
  }
}