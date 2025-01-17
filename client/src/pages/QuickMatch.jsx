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

const QuickMatch = () => {
  const [roomId, setroomId] = useState(null);
  const [roomState, setRoomState] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const [winner, setWinner] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const playerName = localStorage.getItem("playername");
  const navigate = useNavigate();

  useEffect(() => {
    const joinRoom = async () => {
      try {
        socket.emit("joinQuickRoom", { playerName }, (response) => {
          if (!response.success) {
            alert("Room join failed. Redirecting to home.");
            navigate("/");
          } else {
            console.log(response);
            sessionStorage.setItem(`joined_${response.roomId}`, true);
            setPlayerId(response.playerId);
            setroomId(response.roomId);
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
        alert(
          "An error occurred while trying to join the room. Please try again."
        );
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
  }, [navigate]);

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
    navigate("/");
  };

  console.log(roomState);

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
              : `${
                  roomState.players.find((p) => p.id === roomState.turn)
                    ?.name || "Opponent"
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
              <Grid item xs={4} key={index} padding={0}>
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
                        cell || roomState.turn !== playerId
                          ? "white"
                          : "#1FB75B",
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

      <Dialog open={showDialog} onClose={handleDialogClose}>
        <DialogTitle>Game Over</DialogTitle>
        <DialogContent>
          {winner ? `${winner} is the winner! 🎉` : "It's a tie! Well played."}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Exit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default QuickMatch;
