const Room = require("../models/room");

const rooms = {};
let roomId = 1000;

const getRoomById = (roomId) => {
  return rooms[roomId];
};

const makeRoom = () => {
  const newRoom = new Room(roomId);
  rooms[roomId] = newRoom;
  roomId++;
  return newRoom;
};

const deleteRoom = (roomId) => {
  delete rooms[roomId];
};

module.exports = { rooms, getRoomById, makeRoom, deleteRoom };
