import http from 'http'
import { app } from '../server'

export const server = http.createServer(app)
const io = require("socket.io")(server, {
  cors: {
      origin: "*",
  }
})

const usersOnline = {}

io.on('connection', (socket) => {

    socket.on('online', (accountId) => {
        console.log(`user ${accountId} connected`)
        io.emit(`checkOnline${accountId}`, { user: accountId })
        usersOnline[socket.id] = accountId
    })

    socket.on('sendMessage', (chatboxId) => { // when client send message (with data = chatboxId)
        io.emit(`sendMessageFromChatbox${chatboxId}`, { chatboxId }) // emit den client 1 hanh dong cho chatboxId do
    })
  
    socket.on("disconnect", () => {
        console.log(`user ${ usersOnline[socket.id]} disconnected`)
        io.emit(`checkOffline${usersOnline[socket.id]}`, { user: usersOnline[socket.id] })
        delete usersOnline[socket.id]
    });
})