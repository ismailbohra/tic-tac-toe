const { Server } = require("socket.io");
const { rooms, makeRoom } = require("./rooms");
const { ai_move } = require("./aimove");

let currQuickRoom = null;
const initializeSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log(`New connection: ${socket.id}`);

    socket.on("joinRoom", ({ roomId }, callback) => {
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

    socket.on("joinQuickRoom", ({ playerName }, callback) => {
      console.log("Socket joinQuickRoom triggered");

      if (!currQuickRoom || currQuickRoom.players.length >= 2) {
        currQuickRoom = makeRoom();
      }
      const roomId = currQuickRoom.id;
      const playerId = currQuickRoom.addPlayer(playerName);
      socket.join(roomId);
      io.to(roomId).emit("playerUpdate", currQuickRoom.getRoomState());
      callback({
        success: true,
        playerId,
        roomId,
      });
    });

    socket.on("joinAiRoom", ({ playerName }, callback) => {
      console.log("Socket joinAiRoom triggered");
      const airoom = makeRoom();
      const roomId = airoom.id;
      const playerId = airoom.addPlayer(playerName);
      socket.join(roomId);
      io.to(roomId).emit("playerUpdate", airoom.getRoomState());
      callback({
        success: true,
        playerId,
        roomId,
      });
    });

    socket.on("aiMove", ({ roomId, index, playerId }, callback) => {
      const room = rooms[roomId];
      let moveResult = room.makeMove(index, playerId);
      if (moveResult.success && moveResult.winner) {
        console.log(`Game over: Player with ${moveResult.winner} wins.`);
        io.to(roomId).emit("gameOver", { winner: moveResult.winner });
      }
      const move = ai_move(room);
      if (move == -1) {
        io.to(roomId).emit("draw");
        return callback({ success: true });
      }
      moveResult = room.makeMove(move, 2);

      io.to(roomId).emit("playerUpdate", room.getRoomState());

      if (moveResult.success) {
        if (moveResult.winner) {
          console.log(`Game over: Player with ${moveResult.winner} wins.`);
          io.to(roomId).emit("gameOver", { winner: moveResult.winner });
        }

        return callback({ success: true });
      } else {
        return callback({ success: false, error: "Invalid move" });
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
        io.to(roomId).emit("playerUpdate", roomState);

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
          delete rooms[roomId];
        } else {
          io.to(roomId).emit("playerUpdate", room.getRoomState());
        }
      }
    });
  });

  return io;
};

module.exports = { initializeSocket };
