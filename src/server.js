import dotenv from 'dotenv'
import express from "express";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import configCors from "./config/configCors";

import accountRoutes from './routes/account.js';
import userRoutes from './routes/user.js';
import postRoutes from './routes/post.js';
import messageRoutes from './routes/message.js';

import { server } from './chats/ioSocket.js'

dotenv.config()

export const app = express()
const PORT = process.env.PORT || 3333
const CHATPORT = 3434

// config CORS app
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


app.use((req, res) => {
    res.send('404 not found!')
})

// app server
app.listen(PORT, () => {
    console.log(`kalista-backend listening on port ${PORT}`);
})

// chat server
server.listen(CHATPORT, () => {
  console.log(`kalista-chat server listening on port ${CHATPORT}`);
})

