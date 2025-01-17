import express from "express";
import cors from "cors";
import http from "http";
import { initializeSocket } from "./utils/socket.js";
import roomRoutes from './routes/roomRoutes.js';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4000;

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
