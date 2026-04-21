const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

let users = [];

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // JOIN
  socket.on("join", (username) => {
    users.push({ id: socket.id, username });

    socket.broadcast.emit("message", {
      user: "System",
      text: `${username} joined the chat`
    });

    io.emit("users", users);
  });

  // MESSAGE
  socket.on("sendMessage", (data) => {
    io.emit("message", data);
  });

  // TYPING
  socket.on("typing", (username) => {
    socket.broadcast.emit("typing", username);
  });

  // DISCONNECT
  socket.on("disconnect", () => {
    const user = users.find(u => u.id === socket.id);

    if (user) {
      users = users.filter(u => u.id !== socket.id);

      io.emit("message", {
        user: "System",
        text: `${user.username} left the chat`
      });

      io.emit("users", users);
    }
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});