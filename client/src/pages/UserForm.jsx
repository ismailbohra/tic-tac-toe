import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function UserForm() {
  // Initialize state with a fallback to an empty string
  const [name, setName] = useState(localStorage.getItem("playername") || "");
  const [error, setError] = useState(false); // Error state for validation
  const { redirectto } = useParams(); // Extract "redirectto" from URL params
  const location = useLocation(); // Extract full location, including query params
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
    if (event.target.value) setError(false); // Clear error when user types
  };

  const handleContinueClick = () => {
    console.log(redirectto);
    if (!name) {
      setError(true);
    } else if (!redirectto) {
      alert("Invalid redirect path");
    } else {
      localStorage.setItem("playername", name);

      // Append query parameters to the redirect path
      const queryParams = location.search; // Get query params (e.g., "?roomId=1007")
      navigate(`/${redirectto}${queryParams}`); // Combine redirect path and query params
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
          error={error} // Show error styling if error state is true
          helperText={error ? "Name is required" : ""} // Display error message
          sx={{
            maxWidth: "500px",
            marginBottom: "20px",
            width: "100%",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#1FB75B", // Border color
              },
              "&:hover fieldset": {
                borderColor: "#1FB75B", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#1FB75B", // Border color on focus
              },
            },
            "& .MuiInputLabel-root": {
              color: "#1FB75B", // Label color
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#1FB75B", // Label color when focused
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
