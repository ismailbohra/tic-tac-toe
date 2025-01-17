class Room {
  constructor(id) {
    this.id = id;
    this.players = []; // Store players and their IDs
    this.board = Array(9).fill(null); // 3x3 board for Tic-Tac-Toe
    this.turn = null; // Player ID whose turn it is
    this.currentSymbol = null; // Current symbol ("X" or "O")
  }

  // Add a player to the room and assign a unique ID
  addPlayer(playerName) {
    if (this.players.length < 2) {
      const playerId = this.players.length + 1; // Assign ID as 1 or 2
      this.players.push({ name: playerName, id: playerId });

      // Assign first player as "X" and set the initial turn
      if (this.players.length === 1) {
        this.turn = playerId;
        this.currentSymbol = "X";
      }
      return playerId;
    }
    return null; // Room is full
  }

  // Remove a player from the room
  exitPlayer(playerName) {
    this.players = this.players.filter((player) => player.name !== playerName);
  }

  // Check if the room is full (2 players)
  isFull() {
    return this.players.length === 2;
  }

  // Get the current player's ID
  getCurrentPlayerId() {
    return this.turn;
  }

  // Make a move
  makeMove(index, playerId) {
    if (this.turn !== playerId) {
      console.log(`Invalid move: Player ${playerId} tried to move out of turn.`);
      return false; // Not this player's turn
    }

    if (this.board[index] !== null) {
      console.log(`Invalid move: Cell ${index} is already occupied.`);
      return false; // Cell is already occupied
    }

    // Place the move
    this.board[index] = this.currentSymbol;

    // Check if the current player won
    const isWinner = this.checkWinner(this.currentSymbol);
    if (isWinner) {
      console.log(`Player ${playerId} with ${this.currentSymbol} wins!`);
      return { success: true, winner: this.currentSymbol };
    }

    // Switch turn and symbol
    this.turn = playerId === 1 ? 2 : 1;
    this.currentSymbol = this.currentSymbol === "X" ? "O" : "X";

    return { success: true };
  }

  // Get the room state
  getRoomState() {
    return {
      players: this.players.map((player) => player.name),
      board: this.board,
      turn: this.turn,
      currentSymbol: this.currentSymbol,
    };
  }

  // Check for a winner
  checkWinner(symbol) {
    const winPatterns = [
      [0, 1, 2], // Rows
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // Columns
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // Diagonals
      [2, 4, 6],
    ];

    return winPatterns.some((pattern) =>
      pattern.every((index) => this.board[index] === symbol)
    );
  }
}

module.exports = Room;
