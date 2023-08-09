const express = require("express");
const app = express();
const http = require("http").Server(app);
const socketClient = require("socket.io-client")("https://friends-for-rescue.onrender.com");
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});
const port = 4000;
io.on("connection", (socket) => {
  console.log("soccet connected");
  io.emit("soccetconnected", `${socket.id}`);
  // Send message from main server to socket server
  socketClient.on("messageResponse", (data) => {
    socket.emit("message", data);
  });
  // Handle disconnect event
  socket.on("disconnect", () => {
    console.log("soccet disconnected");
    io.emit("soccetDisconnected", `${socket.id}`);
  });
});
// Start the server
http.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});