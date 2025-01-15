import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomForm from "../components/RoomForm";

const HomePage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("HomePage rendered");
  }, []);

  const handleSubmit = (roomId, playerName) => {
    console.log(playerName, roomId);

    if (!roomId) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerName }),
      };
      fetch("http://localhost:4000/api/rooms/create", requestOptions)
        .then((response) => response.json())
        .then((data) =>
          navigate(`/game/${data.roomId}`, { state: { playerName } })
        );
    } else {
      // Joining an existing room
      navigate(`/game/${roomId}`, { state: { playerName } });
    }
  };

  return (
    <div>
      <h1>Tic-Tac-Toe</h1>
      <RoomForm onSubmit={handleSubmit} />
      {error && <p>{error}</p>}
    </div>
  );
};

export default HomePage;
