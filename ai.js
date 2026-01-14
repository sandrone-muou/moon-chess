class AI {
  constructor(game) {
    this.game = game;
  }

  // 获取电脑落子位置
  getMove() {
    const board = this.game.getBoard();
    
    // 1. 检查是否有可以直接获胜的位置
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        // 模拟落子
        board[i] = 'computer';
        if (this.checkWin(board, 'computer')) {
          board[i] = null; // 恢复棋盘
          return i;
        }
        board[i] = null; // 恢复棋盘
      }
    }

    // 2. 检查是否需要防守
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        // 模拟玩家落子
        board[i] = 'player';
        if (this.checkWin(board, 'player')) {
          board[i] = null; // 恢复棋盘
          return i;
        }
        board[i] = null; // 恢复棋盘
      }
    }

    // 3. 优先选择中心位置
    if (board[4] === null) {
      return 4;
    }

    // 4. 优先选择角落位置
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(pos => board[pos] === null);
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }

    // 5. 选择边位置
    const edges = [1, 3, 5, 7];
    const availableEdges = edges.filter(pos => board[pos] === null);
    if (availableEdges.length > 0) {
      return availableEdges[Math.floor(Math.random() * availableEdges.length)];
    }

    // 6. 随机选择可用位置
    const availablePositions = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
    if (availablePositions.length > 0) {
      return availablePositions[Math.floor(Math.random() * availablePositions.length)];
    }

    return null; // 无可用位置
  }

  // 检查是否获胜
  checkWin(board, player) {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // 横向
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // 纵向
      [0, 4, 8], [2, 4, 6]             // 对角线
    ];

    for (const pattern of winPatterns) {
      if (pattern.every(pos => board[pos] === player)) {
        return true;
      }
    }
    return false;
  }

  // 执行电脑落子
  makeMove() {
    const move = this.getMove();
    if (move !== null) {
      this.game.placeMove(move, 'computer');
    }
  }
}