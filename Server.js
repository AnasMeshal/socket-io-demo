const path = require("path");
const express = require("express");
const app = express();
const socketIO = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "Client")));

// socket connecting
io.on("connection", (socket) => {
  socket.emit("msg-server", {
    user: "bot",
    msg: `welcome ${socket.id.substring(0, 3)} ~~!`,
  });
  socket.broadcast.emit("msg-server", {
    user: "bot",
    msg: `${socket.id.substring(0, 3)} has joined ~~!`,
  });

  socket.on("msg-cli", (msg) => {
    io.emit("msg-server", { user: socket.id.substring(0, 3), msg: msg });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("msg-server", {
      user: "bot",
      msg: `${socket.id.substring(0, 3)} has left ~~!`,
    });
  });
});

server.listen(port, () => console.log(`server running on port ${port} `));
