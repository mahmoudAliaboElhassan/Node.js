// sent and received messages or events
// http pooling
// client connect to server after specified second
// setInterval

// web sockets provide full duplex communication

console.log("Hello from real time application");

const express = require("express");
const { join } = require("node:path");
const { Server } = require("socket.io");
const http = require("node:http");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("User Connected with socket id", socket.id);
  socket.on("message", (msg) => {
    console.log("message: " + msg);
    io.emit("send_message_to_all_users", msg);
  });
  socket.on("show-typing", () => {
    socket.broadcast.emit("show-typing-status");
  });
  socket.on("hide-typing", () => {
    socket.broadcast.emit("hide-typing-status");
  });
});
// opening 3 will log 3 user connected with socket id each of different id

// emit -> publish an event using .emit(eventName,data)
// on -> listen for events using .on(eventName,callback)

// this is called even driven

// broadcasating when server receive messages from client it should send it
// to the rest of clients as chat

app.post("/api/send", (req, res) => {
  // Emit the event to all connected users
  io.emit("send", "hello mahmoud");
  res.status(200).json({ message: "Event emitted successfully" });
});

server.listen(3000, () => {
  console.log("connected successfully");
});
