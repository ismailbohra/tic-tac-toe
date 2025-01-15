// utils/rooms.js
const Room = require("../models/room");

const rooms = {};  // Global in-memory store for rooms
let roomId=1000;
// Utility functions to access rooms globally

// Get a room by ID
const getRoomById = (roomId) => {
  return rooms[roomId];
};

// Add a new room
const makeRoom = () => {
  if (rooms[roomId]) {
    return null;  // Room already exists
  }
  
  const newRoom = new Room(roomId);
  rooms[roomId] = newRoom;
  roomId++;
  return newRoom;
};

// Delete a room (optional, for cleanup)
const deleteRoom = (roomId) => {
  delete rooms[roomId];
};

module.exports = { rooms, getRoomById, makeRoom, deleteRoom };
