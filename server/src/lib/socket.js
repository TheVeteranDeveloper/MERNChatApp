// socket.io becomes main server replacing express
// check index.js file for changes

import { Server } from "socket.io";
import http from "http"; // import http module from Node.js
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

// helper function for message controller
export function getReceiverSocketId(userId) {
  return userSocketMap[userId]; // returns socketId of user from userSocketMap
}

// object to store online users
const userSocketMap = {}; // userId (from DB) as key and socketId (socket.id from .on) as value

// listen for incoming
// connections
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId; // get userId to correlate with authStore
  if (userId) {
    userSocketMap[userId] = socket.id; // store userId and socketId in userSocketMap
  }

  // broadcast to all connected users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // disconnections
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    // remove userId from userSocketMap
    delete userSocketMap[userId]; // delete user's key from userSocketMap
    // broadcast to all online users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, server, app };
