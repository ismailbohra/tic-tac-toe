const express = require("express");
const cors = require("cors");
const http = require("http");
const { initializeSocket } = require("./utils/socket");
const app = express();
const PORT = 4000;
const roomRoutes = require('./routes/roomRoutes')

import path from "path";
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
initializeSocket(server);

app.use("/api/rooms", roomRoutes);

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
