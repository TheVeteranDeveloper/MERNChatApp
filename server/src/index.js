// import web framework
import express from "express";
// import router
import authRoutes from "./routes/auth.route.js";
// message routes
import messageRoutes from "./routes/message.route.js";
// admin routes
import adminRoutes from "./routes/admin.route.js";
// import DB connection
import { connectDB } from "./lib/db.js";
// import cors
import cors from "cors";
// import app and server from socket.js
import { app, server } from "./lib/socket.js";
// import dotenv
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

import path from "path"; // node module for working with file and directory paths

// initialize App
// const app = express(); <- remove and change listener (below) to server once socket.io is implemented

const PORT = process.env.PORT;
const __dirname = path.resolve(); // get the current directory

// middleware to extract json data from body
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admin", adminRoutes);

// serve static files with express middleware
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html")); // entry point for REACT application
  });
}

// listen (replace app with server once socket.io is implemented)
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
