// src/socket.js
import { io } from 'socket.io-client';

const socket = io('/');  // Backend URL

export { socket };
