import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { socket } from "../socket";

const RoomGame = () => {
  const { roomId } = useParams();
  const [roomState, setRoomState] = useState(null);
  const location = useLocation();
  const playerName = location.state?.playerName || "Player";
  const navigate = useNavigate();

  useEffect(() => {
    

    const joinRoom = async () => {
      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ roomId, playerName }),
        };
  
        const response = await fetch("http://localhost:4000/api/rooms/join", requestOptions);
  
        if (!response.ok) {
          throw new Error(`Server error: ${response.statusText}`);
        }
  
        const data = await response.json();
        console.log(data);
  
        // Emit the joinRoom event only if the fetch call succeeds
        socket.emit("joinRoom", { roomId, playerName }, (response) => {
          if (!response.success) {
            alert("Room join failed. Redirecting to home.");
            navigate("/");
          } else {
            sessionStorage.setItem(`joined_${roomId}`, true); // Set flag to prevent rejoining
          }
        });

        socket.on("playerUpdate", (updatedRoomState) => {
          setRoomState(updatedRoomState);
        });
      } catch (error) {
        console.error("Failed to join the room:", error);
        alert("An error occurred while trying to join the room. Please try again.");
        navigate("/"); // Redirect to the home page in case of error
      }
    };

    joinRoom()


    // Cleanup logic when leaving the room
    const leaveRoom = () => {
      sessionStorage.removeItem(`joined_${roomId}`); // Clear the session storage flag
      fetch("http://localhost:4000/api/rooms/exit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId, playerName }),
      }).then(() => {
        socket.emit("leaveRoom", { roomId, playerName });
      });
    };

    window.addEventListener("beforeunload", leaveRoom);
    return () => {
      leaveRoom(); // Trigger leave logic on component unmount
      socket.off("playerUpdate");
      window.removeEventListener("beforeunload", leaveRoom);
      console.log('exitroom')
    };
  }, [roomId, playerName, navigate]);

  const handleMove = (index) => {
    const move = { index, symbol: roomState.turn };
    socket.emit("makeMove", { roomId, move }, (response) => {
      if (response.success) {
        console.log("Move successful");
      } else {
        console.log("Move failed");
      }
    });
  };

  return (
    <div>
      <h1>Tic-Tac-Toe - Room {roomId}</h1>
      <h2>{roomState?.turn}'s Turn</h2>
      {roomState && (
        <>
          <div>
            {roomState.players.map((player, index) => (
              <p key={index}>{player}</p>
            ))}
          </div>
          <div>
            <h3>Board:</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 100px)" }}>
              {roomState.board.map((cell, index) => (
                <div
                  key={index}
                  onClick={() => handleMove(index)}
                  style={{
                    width: 100,
                    height: 100,
                    border: "1px solid black",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    backgroundColor: cell ? "#ddd" : "white",
                  }}
                >
                  {cell}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RoomGame;
