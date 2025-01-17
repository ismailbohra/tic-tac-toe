import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  Divider,
} from "@mui/material";

const MakeRoom = () => {
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("MakeRoom rendered");
  }, []);

  const handleRoomIdChange = (event) => {
    setRoomId(event.target.value);
  };

  const handleCreateRoom = () => {
    const playerName = localStorage.getItem("playername");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ playerName }),
    };
    fetch("/api/rooms/create", requestOptions)
      .then((response) => response.json())
      .then((data) => navigate(`/game?roomId=${data.roomId}`));
  };

  const handleJoinRoom = () => {
    if (!roomId) {
      setError("Room ID cannot be empty!");
      return;
    }

    navigate(`/game?roomId=${roomId}`);
  };

  return (
    <Container>
      <Typography
        mt={5}
        fontSize={{ xs: 55, md: 85 }}
        fontWeight={400}
        fontStyle={"normal"}
        fontFamily={'"Pacifico", serif'}
        textAlign="center"
        color="#1FB75B"
      >
        Tic Tac Toe
      </Typography>

      <Box
        sx={{
          flexGrow: 1,
          mt: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid
          container
          justifyContent="space-around"
          spacing={0}
          sx={{ padding: 0 }}
          rowSpacing={5}
        >
          <Grid item xs={12} md={5} sx={{ padding: 0 }}>
            <Box
              sx={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Button
                variant="outlined"
                onClick={handleCreateRoom}
                sx={{
                  width: "100%",
                  height: "60px",
                  fontSize: "1.2rem",
                  border: 2,
                  color: "#1FB75B",
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                  borderRadius: 5,
                  ":hover": {
                    backgroundColor: "#1FB75B",
                    color: "white",
                  },
                }}
              >
                <Typography
                  fontSize={{ xs: 17, md: 35 }}
                  fontWeight={400}
                  fontStyle={"normal"}
                  fontFamily={'"Acme", regular'}
                  sx={{ textTransform: "none" }}
                >
                  + Create Room
                </Typography>
              </Button>
            </Box>
          </Grid>

          <Divider orientation="vertical" flexItem />

          <Grid item xs={12} md={5} sx={{ padding: 0 }}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                fontSize={{ xs: 17, md: 25 }}
                fontWeight={400}
                fontStyle={"normal"}
                fontFamily={'"Acme", regular'}
                sx={{ textTransform: "none" }}
                mb={2}
              >
                Join Existing Room
              </Typography>
              <TextField
                id="outlined-room-id"
                label="Enter Room ID"
                variant="outlined"
                value={roomId}
                onChange={handleRoomIdChange}
                sx={{
                  color: "#1FB75B",
                  maxWidth: "500px",
                  marginBottom: "20px",
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#1FB75B",
                    },
                    "&:hover fieldset": {
                      borderColor: "#1FB75B",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#1FB75B",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#1FB75B",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#1FB75B",
                  },
                }}
              />
              <Button
                variant="outlined"
                onClick={handleJoinRoom}
                sx={{
                  width: "100%",
                  height: "60px",
                  fontSize: "1.2rem",
                  border: 2,
                  color: "#1FB75B",
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                  borderRadius: 5,
                  ":hover": {
                    backgroundColor: "#1FB75B",
                    color: "white",
                  },
                }}
              >
                <Typography
                  fontSize={{ xs: 17, md: 35 }}
                  fontWeight={400}
                  fontStyle={"normal"}
                  fontFamily={'"Acme", regular'}
                  sx={{ textTransform: "none" }}
                >
                  Continue
                </Typography>
              </Button>
            </Box>
          </Grid>
        </Grid>

        {error && (
          <Typography color="red" mt={2}>
            {error}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default MakeRoom;
