class Room {
    constructor(id) {
      this.id = id;
      this.players = [];
      this.board = Array(9).fill(null);  // 3x3 board for Tic-Tac-Toe
      this.turn = "X";  // X always goes first
    }
  
    // Add a player to the room
    addPlayer(player) {
      if (this.players.length < 2) {
        this.players.push(player);
        return true;
      }
      return false;
    }
    
    exitPlayer(player){
      if (this.players.length  > 0) {
        this.players = this.players.filter((e)=>e!=player)
        return true;
      }
      return false;
    }

    // Check if the room is full (2 players)
    isFull() {
      return this.players.length === 2;
    }
  
    // Get the current player
    getCurrentPlayer() {
      return this.turn === "X" ? this.players[0] : this.players[1];
    }
  
    // Make a move
    makeMove(index, symbol) {
      if (this.board[index] !== null) return false; // spot is already taken
      this.board[index] = symbol;
      this.turn = symbol === "X" ? "O" : "X"; // Switch turn
      return true;
    }
  
    // Get the room state (including players and board)
    getRoomState() {
      return {
        players: this.players,
        board: this.board,
        turn: this.turn,
      };
    }
    checkWinner(symbol) {
        // Winning combinations: rows, columns, diagonals
        const winPatterns = [
          [0, 1, 2], // Row 1
          [3, 4, 5], // Row 2
          [6, 7, 8], // Row 3
          [0, 3, 6], // Column 1
          [1, 4, 7], // Column 2
          [2, 5, 8], // Column 3
          [0, 4, 8], // Diagonal 1
          [2, 4, 6], // Diagonal 2
        ];
    
        // Check if any winning pattern matches the symbol
        for (let pattern of winPatterns) {
          if (pattern.every(index => this.board[index] === symbol)) {
            return true;
          }
        }
        return false;
      }
  }
  
  module.exports = Room;
  