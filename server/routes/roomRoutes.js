const express = require("express");
const { createRoom, joinRoom, exitRoom } = require("../controller/roomController");
const router = express.Router();

router.post("/create", createRoom);
router.post("/join", joinRoom);
router.post("/exit", exitRoom);

module.exports = router;
