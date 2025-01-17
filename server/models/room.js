class Room {
  constructor(id) {
    this.id = id;
    this.players = [];
    this.board = Array(9).fill(null);
    this.turn = null;
    this.currentSymbol = null;
  }

  addPlayer(playerName) {
    if (this.players.length < 2) {
      const playerId = this.players.length + 1;
      this.players.push({ name: playerName, id: playerId });

      if (this.players.length === 1) {
        this.turn = playerId;
        this.currentSymbol = "X";
      }
      return playerId;
    }
    return null;
  }

  exitPlayer(playerName) {
    this.players = this.players.filter((player) => player.name !== playerName);
  }

  isFull() {
    return this.players.length === 2;
  }

  getCurrentPlayerId() {
    return this.turn;
  }

  makeMove(index, playerId) {
    if (this.turn !== playerId) {
      console.log(
        `Invalid move: Player ${playerId} tried to move out of turn.`
      );
      return false;
    }

    if (this.board[index] !== null) {
      console.log(`Invalid move: Cell ${index} is already occupied.`);
      return false;
    }

    this.board[index] = this.currentSymbol;

    const isWinner = this.checkWinner(this.currentSymbol);
    if (isWinner) {
      console.log(`Player ${playerId} with ${this.currentSymbol} wins!`);
      return { success: true, winner: this.currentSymbol };
    }

    this.turn = playerId === 1 ? 2 : 1;
    this.currentSymbol = this.currentSymbol === "X" ? "O" : "X";

    return { success: true };
  }

  getRoomState() {
    return {
      players: this.players.map((player) => player.name),
      board: this.board,
      turn: this.turn,
      currentSymbol: this.currentSymbol,
    };
  }

  checkWinner(symbol) {
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

    return winPatterns.some((pattern) =>
      pattern.every((index) => this.board[index] === symbol)
    );
  }
}

module.exports = Room;
