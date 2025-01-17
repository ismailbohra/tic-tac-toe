function checkWinner(board) {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }
  return board.includes(null) ? null : "draw";
}

function recursion(room, curr_symbol, isMaximizing) {
  const winner = checkWinner(room.board);
  if (winner === "X") return -1;
  if (winner === "O") return 1;
  if (winner === "draw") return 0;

  let bestScore = isMaximizing ? -Infinity : Infinity;

  for (let i = 0; i < room.board.length; i++) {
    if (room.board[i] === null) {
      room.board[i] = curr_symbol;
      const nextSymbol = curr_symbol === "X" ? "O" : "X";
      const score = recursion(room, nextSymbol, !isMaximizing);
      room.board[i] = null;

      if (isMaximizing) {
        bestScore = Math.max(score, bestScore);
      } else {
        bestScore = Math.min(score, bestScore);
      }
    }
  }
  return bestScore;
}

const ai_move = (room) => {
  let bestScore = -Infinity;
  let move = -1;

  for (let i = 0; i < room.board.length; i++) {
    if (room.board[i] === null) {
      room.board[i] = "O";
      const score = recursion(room, "X", false);
      room.board[i] = null;

      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }

  return move;
};

module.exports = {
  ai_move,
};
