const path = require ('path');
const express = require ('express');
const http = require ('http');
const socketio = require ('socket.io');
const chatFormat = require('./utilities/chatFormat.js');
const {joinUser, currentUser, onLeave, userRoom} = require('./utilities/user.js');
const app = express();
const server = http.createServer(app)
const io = socketio(server);


app. use(express.static(path.join(__dirname, 'public' )));


io.on('connection', socket => {
    socket.on('userJoinRoom', ({username, room})=>{

        const user = joinUser(socket.id, username,room)

        socket.join(user.room);

        socket.emit('message', chatFormat('ChatBot ', 'Welcome to socket.io'));

        socket.broadcast.to(user.room).emit('message', chatFormat('ChatBot', `${user.username} just joined the chat`));

        io.to(user.room).emit('userRoom', {
            room : user.room,
            users : userRoom(user.room)
        })
    })


    socket.on('disconnect', ()=>{
        const user = onLeave(socket.id);

        if(user){
            io.emit('message', chatFormat('ChatBot', `${user.username} left the chat`));

            io.to(user.room).emit('userRoom', {
                room : user.room,
                users : userRoom(user.room)
            })
        }
    });

    socket.on('chatMessage', (msg)=>{

        const user =  currentUser(socket.id);
        io.to(user.room).emit('message', chatFormat(user.username, msg))
    })
})

server.listen('3000', ()=>{
    console.log("app running successfully");
})
