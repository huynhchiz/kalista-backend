import dotenv from 'dotenv'
import express from "express";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

// import { Server } from 'socket.io';
import http from 'http'

import configCors from "./config/configCors";

import accountRoutes from './routes/account.js';
import userRoutes from './routes/user.js';
import postRoutes from './routes/post.js';
import messageRoutes from './routes/message.js';



dotenv.config()

const app = express()
const PORT = process.env.PORT || 3333

const server = http.createServer(app)
// const io = new Server(server)
const io = require("socket.io")(server, {
  cors: {
      origin: "*",
  }
}); 

// config CORS
configCors(app);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

// config cookie parser
app.use(cookieParser());

accountRoutes(app)
userRoutes(app)
postRoutes(app)
messageRoutes(app)

io.on('connection', (socket) => { // Handle khi có connect từ client tới
  console.log('user connected ' + io.id);

  socket.on("sendDataClient", (data) => { // Handle khi có sự kiện tên là sendDataClient từ phía client
    io.emit("sendDataServer", { data });// phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected"); // Khi client disconnect thì log ra terminal.
  });
})

app.use((req, res) => {
    res.send('404 not found!')
})

app.listen(PORT, () => {
    console.log(`kalista-backend listening on port ${PORT}`);
})

server.listen(3434, () => {
  console.log(`kalista-chat server listening on port ${3434}`);
})