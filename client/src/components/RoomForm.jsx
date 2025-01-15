// src/components/RoomForm.js
import React, { useState } from "react";

const RoomForm = ({ onSubmit }) => {
  const [roomId, setRoomId] = useState("");
  const [playerName, setPlayerName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(roomId, playerName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Room ID</label>
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter Room ID"
        />
      </div>
      <div>
        <label>Player Name</label>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter Player Name"
        />
      </div>
      <button type="submit">Join or Create Room</button>
    </form>
  );
};

export default RoomForm;
