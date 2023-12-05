import http from 'http'
import { app } from '../server'
import db from '../models/index.js'

export const server = http.createServer(app)
const io = require("socket.io")(server, {
  cors: {
      origin: "*",
  }
})

const getChatboxName = async () => {
    let chatboxs = await db.Chatboxs.findAll({
        attributes: ['name']
    })
    return chatboxs
}


io.on('connection', (socket) => { // Handle khi có connect từ client tới
    console.log('user connected ' + socket.id);
  
    socket.emit("getId", socket.id);  
    
    socket.on("sendDataClient", (data) => { // Handle khi có sự kiện tên là sendDataClient từ phía client
        getChatboxName()
        .then((data) => {
            let chatboxName = data.map(name => name.name)
            chatboxName.forEach(item => {
                io.emit(`sendDataServer_${item}`, { data }); // phát sự kiện có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
            });
        })
    })
  
    socket.on("disconnect", () => {
      console.log("Client disconnected"); // Khi client disconnect thì log ra terminal.
    });
})