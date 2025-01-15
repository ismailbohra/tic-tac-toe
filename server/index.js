const express = require("express");
const cors = require("cors");
const http = require("http");
const { initializeSocket } = require("./utils/socket");
const app = express();
const PORT = 4000;
const roomRoutes = require('./routes/roomRoutes')

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
initializeSocket(server);

app.use("/api/rooms", roomRoutes);
// app.use("/api/game", gameRoutes);


server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
