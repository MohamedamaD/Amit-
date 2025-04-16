const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));

const users = {};
const groups = {};

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Register user
  socket.on("register", (username) => {
    users[username] = socket.id;
    socket.username = username;
    console.log(`${username} registered as ${socket.id}`);
  });

  // Create Group
  socket.on("create group", (groupName, callback) => {
    if (groups[groupName]) {
      callback({ success: false, message: "Group already exists" });
    } else {
      groups[groupName] = new Set();
      callback({ success: true, message: `Group "${groupName}" created` });
    }
  });

  // Private message
  socket.on("private message", ({ to, message }) => {
    const targetSocket = users[to];
    if (targetSocket) {
      io.to(targetSocket).emit("private message", {
        from: socket.username,
        message,
      });
    }
  });

  // JOIN group
  socket.on("join group", (groupName, callback) => {
    if (!groups[groupName]) {
      callback({ success: false, message: "Group does not exist" });
      return;
    }
    socket.join(groupName);
    groups[groupName].add(socket.username);
    callback({ success: true, message: `Joined group ${groupName}` });
  });
  // Group message
  socket.on("group message", ({ group, message }) => {
    io.to(group).emit("group message", {
      from: socket.username,
      message,
    });
  });

  socket.on("disconnect", () => {
    console.log(`${socket.username} disconnected`);
    delete users[socket.username];
  });
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
