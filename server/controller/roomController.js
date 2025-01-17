const { makeRoom, getRoomById } = require("../utils/rooms");

const createRoom = (req, res) => {
  const room = makeRoom();
  console.log("New room created with ID:", room.id);
  const roomId = room.id;
  res.status(201).json({ roomId });
};

const joinRoom = (req, res) => {
  const { playerName, roomId } = req.body;
  const room = getRoomById(roomId);

  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }

  if (room.isFull()) {
    return res.status(400).json({ error: "Room is full" });
  }

  const playerId = room.addPlayer(playerName); // Add the player and get their ID
  if (!playerId) {
    return res.status(500).json({ error: "Failed to join room" });
  }

  console.log(`${playerName} joined the room as Player ${playerId}`);
  res.status(200).json({ 
    message: "Joined the room successfully", 
    roomId, 
    playerId 
  });
};

const exitRoom = (req, res) => {
  const { playerName, roomId } = req.body;
  const room = getRoomById(roomId);

  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }

  room.exitPlayer(playerName);

  if (room.players.length === 0) {
    // Optional cleanup logic if the room is empty
    console.log(`Room ${roomId} is now empty and can be deleted.`);
  }

  console.log(`${playerName} exited the room`);
  res.status(200).json({ 
    message: "Exited the room successfully", 
    roomId 
  });
};

module.exports = {
  createRoom,
  joinRoom,
  exitRoom,
};
