import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { socket } from "../socket";
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const RoomGame = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const roomId = queryParams.get("roomId");

  const [roomState, setRoomState] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const [winner, setWinner] = useState(null); // Store winner's name or ID
  const [showDialog, setShowDialog] = useState(false); // Control the dialog visibility
  const playerName = localStorage.getItem("playername");
  const navigate = useNavigate();

  useEffect(() => {
    const joinRoom = async () => {
      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ roomId, playerName }),
        };

        const response = await fetch(
          "/api/rooms/join",
          requestOptions
        );

        if (!response.ok) {
          throw new Error(`Server error: ${response.statusText}`);
        }

        const data = await response.json();
        setPlayerId(data.playerId);

        socket.emit("joinRoom", { roomId }, (response) => {
          if (!response.success) {
            alert("Room join failed. Redirecting to home.");
            navigate("/");
          } else {
            sessionStorage.setItem(`joined_${roomId}`, true);
          }
        });

        socket.on("playerUpdate", (updatedRoomState) => {
          setRoomState(updatedRoomState);
        });

        socket.on("gameOver", ({ winner }) => {
          setWinner(winner);
          setShowDialog(true);
        });
      } catch (error) {
        console.error("Failed to join the room:", error);
        alert("An error occurred while trying to join the room. Please try again.");
        navigate("/");
      }
    };

    joinRoom();

    const leaveRoom = () => {
      sessionStorage.removeItem(`joined_${roomId}`);
      fetch("/api/rooms/exit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId, playerName }),
      }).then(() => {
        socket.emit("leaveRoom", { roomId, playerName });
      });
    };

    window.addEventListener("beforeunload", leaveRoom);
    return () => {
      leaveRoom();
      socket.off("playerUpdate");
      socket.off("gameOver");
      window.removeEventListener("beforeunload", leaveRoom);
    };
  }, [roomId, playerName, navigate]);

  const handleMove = (index) => {
    if (!playerId) {
      alert("Player ID not found. Please rejoin the room.");
      return;
    }

    socket.emit("makeMove", { roomId, index, playerId }, (response) => {
      if (response.success) {
        console.log("Move successful");
      } else {
        console.error("Move failed:", response.error);
        alert(response.error || "Invalid move. Try again.");
      }
    });
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    navigate("/"); // Redirect to home after the game ends
  };

  const copyInviteLink = () => {
    const inviteLink = `${window.location.origin}/userform/game?roomId=${roomId}`;
    navigator.clipboard.writeText(inviteLink)
      .then(() => alert("Invite link copied to clipboard!"))
      .catch((err) => console.error("Failed to copy link: ", err));
  };

  return (
    <Container>
      <Typography
        mt={5}
        fontSize={{ xs: 40, md: 60 }}
        fontWeight={400}
        fontStyle={"normal"}
        fontFamily={'"Pacifico", serif'}
        textAlign="center"
        color="#1FB75B"
      >
        Tic Tac Toe
      </Typography>
      {!roomState || roomState.players.length < 2 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <Typography
            fontSize={{ xs: 20, md: 30 }}
            fontWeight={400}
            fontStyle={"normal"}
            color="#1FB75B"
          >
            Waiting for another player to join...
          </Typography>
          <CircularProgress sx={{ color: "#1FB75B", ml: 2 }} />
        </Box>
      ) : (
        <>
          <Typography
            mt={3}
            fontSize={{ xs: 20, md: 25 }}
            fontWeight={400}
            color="#1FB75B"
          >
            {roomState.turn === playerId
              ? "Your Turn"
              : `${roomState.players.find((p) => p.id === roomState.turn)?.name || "Opponent"
              }'s Turn`}
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{
              justifyContent: "center",
              mt: 3,
              width: "100%",
              maxWidth: "400px",
              margin: "0 auto",
            }}
          >
            {roomState.board.map((cell, index) => (
              <Grid item xs={4} key={index}>
                <Paper
                  elevation={3}
                  onClick={() => handleMove(index)}
                  sx={{
                    width: 100,
                    height: 100,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "2rem",
                    fontWeight: "bold",
                    cursor:
                      cell || roomState.turn !== playerId
                        ? "not-allowed"
                        : "pointer",
                    backgroundColor: cell ? "#ddd" : "white",
                    border: "1px solid #1FB75B",
                    "&:hover": {
                      backgroundColor:
                        cell || roomState.turn !== playerId ? "white" : "#1FB75B",
                      color:
                        cell || roomState.turn !== playerId ? "black" : "white",
                    },
                  }}
                >
                  {cell}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* Dialog for Game Over */}
      <Dialog open={showDialog} onClose={handleDialogClose}>
        <DialogTitle>Game Over</DialogTitle>
        <DialogContent>
          {winner
            ? `${winner} is the winner! 🎉`
            : "It's a tie! Well played."}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Exit
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        onClick={copyInviteLink}
        variant="contained"
        sx={{
          position: "fixed",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#1FB75B",
          color: "white",
          "&:hover": { backgroundColor: "#17a34a" },
        }}
      >
        Copy Invite Link
      </Button>
    </Container>
  );
};

export default RoomGame;
