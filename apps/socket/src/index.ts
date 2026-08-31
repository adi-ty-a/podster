import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { User } from "./Usermanage.js";
import { isauthenticated } from "./auth/authentication.js"
import 'dotenv/config'

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

const user = new User();

io.use((Socket, next) => {
  if (isauthenticated(Socket)) {
    next()
  } else {
    next(new Error("not authorized"))
  }
})

io.on("connection", (socket) => {
  socket.onAny((event, ...args) => {
    console.log("EVENT:", event);
    console.log("DATA:", args);
  });

  socket.on("join", (data) => {
    console.log("roomid - > " + data);
    user.joinroom(socket, data);
  })
  user.initHandler(socket);
});

httpServer.listen(3002);
