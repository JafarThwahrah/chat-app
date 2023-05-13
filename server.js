const express = require('express')
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const { log } = require('console');
const app = express();
const server = http.createServer(app)
const io = socketio(server);
const formatMessage = require("./Models/message");
const { userJoin,userLeave,getCurrentUser } = require('./Models/user');

//static file
app.use(express.static(path.join(__dirname, 'public')))
const botName = 'Bot'
//on connection
io.on('connection',(socket)=>{

    socket.on('joinRoom',({username,room})=>{

        const user = userJoin(socket.id , username , room)
        socket.join(user.room)


        socket.emit('message' , formatMessage(botName,"welcome to chat"))
    socket.broadcast.to(user.room).emit('message', formatMessage(botName,`${user.username} has joined the chat`));
    })

        socket.on('chatMessage',message =>{
           const user = getCurrentUser(socket.id)
        io.to(user.room).emit('message' ,formatMessage(user.username,message) )
    })

    socket.on('disconnect' , ()=>{
const user = userLeave(socket.id)
if(user){
        io.to(user.room).emit('message',formatMessage(botName,`${user.username} has left the chat`))
    }
    })
})
const PORT = 3000;
server.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})