import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid";

function MainPage() {
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
          <Grid container spacing={2} justifyContent="center">
            {/* First Row: Two Buttons */}
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                sx={{
                  height: "120px",
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
                  Play Against AI
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                sx={{
                  height: "120px",
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
                  Quick Match Online
                </Typography>
              </Button>
            </Grid>

            {/* Second Row: One Centered Button */}
            <Grid item xs={6} md={12}>
              <Box display="flex" justifyContent="center">
                <Button
                  variant="outlined"
                  sx={{
                    width: "100%",
                    maxWidth: "500px",
                    height: "120px",
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
                    Invite a Friend
                  </Typography>
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default MainPage;
