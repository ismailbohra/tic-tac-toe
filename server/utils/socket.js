const { Server } = require("socket.io");
const { rooms } = require("./rooms");

const initializeSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log(`New connection: ${socket.id}`);

    socket.on("joinRoom", ({ roomId, playerName }, callback) => {
      console.log("Socket joinRoom triggered");
      const room = rooms[roomId];
      if (room) {
        socket.join(roomId);
        io.to(roomId).emit("playerUpdate", room.getRoomState());
        callback({ success: true, roomId });
      } else {
        callback({ error: "Room not found" });
      }
    });

    socket.on("makeMove", ({ roomId, index, playerId }, callback) => {
      const room = rooms[roomId];
      if (!room) {
        return callback({ success: false, error: "Room not found" });
      }
    
      const moveResult = room.makeMove(index, playerId);
    
      if (moveResult.success) {
        const roomState = room.getRoomState();
        io.to(roomId).emit("playerUpdate", roomState); // Emit the updated state to the room
    
        if (moveResult.winner) {
          console.log(`Game over: Player with ${moveResult.winner} wins.`);
          io.to(roomId).emit("gameOver", { winner: moveResult.winner });
        }
    
        return callback({ success: true });
      } else {
        return callback({ success: false, error: "Invalid move" });
      }
    });
    

    socket.on("leaveRoom", ({ roomId, playerName }) => {
      const room = rooms[roomId];
      if (room) {
        room.exitPlayer(playerName);
        if (room.players.length === 0) {
          delete rooms[roomId]; // Clean up empty room
        } else {
          io.to(roomId).emit("playerUpdate", room.getRoomState());
        }
      }
    });
  });

  return io;
};

module.exports = { initializeSocket };
