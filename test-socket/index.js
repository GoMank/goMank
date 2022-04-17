const express = require('express');
const app = express();
const Redis = require('ioredis');
const redis = new Redis();
const { v4 } = require('uuid');
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: [],
    },
});
const PORT = process.env.PORT || 3000;

let messagesData = [];
const clients = [];

const updateClientList = (params) => {};

io.on('connection', (socket) => {
    console.log(`${socket.id} socket connected`);
    socket.on('disconnect', () => {
        console.log('user disconnected');
        messagesData = [];
    });

    updateClientList(socket.id);

    io.emit('getMessages', messagesData);

    socket.on('postMessage', (msg) => {
        messagesData.unshift({
            ...msg,
            id: v4(),
            senderId: socket.id,
            user: { _id: socket.id },
        });

        console.log(messagesData);
        io.emit('getMessages', messagesData);
    });
});

server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});