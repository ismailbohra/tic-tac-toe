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
    // When a player makes a move
    socket.on("makeMove", ({ roomId, move }, callback) => {
      const room = rooms[roomId];
      console.log(move);
      if (room.makeMove(move.index, move.symbol)) {
        io.to(roomId).emit("playerUpdate", room.getRoomState());
      }
      callback({ success: true });
    });

    socket.on("joinRoom", ({ roomId }, callback) => {
      console.log("socket hit to join") 
      const room = rooms[roomId];
      if (room) {
        socket.join(roomId);
        io.to(roomId).emit("playerUpdate", room.getRoomState());
        callback({ success: true });
      } else {
        callback({ error: "Room not found" });
      }
    });
    socket.on("leaveRoom", ({ roomId, playerName }) => {
      const room = rooms[roomId];
      if (room) {
        room.players = room.players.filter((player) => player.name !== playerName);
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
