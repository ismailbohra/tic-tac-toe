const { makeRoom, getRoomById } = require("../utils/rooms");
const createRoom = (req, res) => {
  const room = makeRoom();
  console.log("new room created")
  console.log(room.id)
  const roomId = room.id
  res.send({roomId});
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
  console.log(room.isFull())

  room.addPlayer(playerName);
  console.log(playerName + " joined the room")
  res.status(200).json({ message: "Joined the room successfully", roomId });
};
const exitRoom = (req, res) => {
  const { playerName, roomId } = req.body;
  const room = getRoomById(roomId);

  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }
  room.exitPlayer(playerName);
  res.status(200).json({ message: "Exited the room successfully", roomId });
};

module.exports = {
  createRoom,
  joinRoom,
  exitRoom,
};
