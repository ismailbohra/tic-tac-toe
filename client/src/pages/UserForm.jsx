import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

function UserForm() {
  const [name, setName] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleContinueClick = () => {
    // You can add any functionality when the Continue button is clicked
    alert(`Hello, ${name}!`);
  };

  return (
    <>
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
            sx={{
              maxWidth: "500px",
              marginBottom: "20px",
              width: '100%',
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
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
    </>
  );
}

export default UserForm;
