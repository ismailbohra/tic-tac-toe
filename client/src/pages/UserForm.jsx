import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function UserForm() {
  const [name, setName] = useState(localStorage.getItem("playername") || "");
  const [error, setError] = useState(false);
  const { redirectto } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
    if (event.target.value) setError(false);
  };

  const handleContinueClick = () => {
    console.log(redirectto);
    if (!name) {
      setError(true);
    } else if (!redirectto) {
      alert("Invalid redirect path");
    } else {
      localStorage.setItem("playername", name);

      const queryParams = location.search;
      navigate(`/${redirectto}${queryParams}`);
    }
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
      <Box sx={{ flexGrow: 1, mt: 4 }}>
        <TextField
          id="outlined-name"
          label="Enter Your Name"
          variant="outlined"
          value={name}
          onChange={handleNameChange}
          error={error}
          helperText={error ? "Name is required" : ""}
          sx={{
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
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            onClick={handleContinueClick}
            sx={{
              width: "100%",
              maxWidth: "300px",
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
      </Box>
    </Container>
  );
}

export default UserForm;
