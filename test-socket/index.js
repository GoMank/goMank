const express = require('express');
const app = express();
const Redis = require('ioredis');
const mongoose = require('mongoose');
const Msg = require('./models/messages');
const { v4 } = require('uuid');
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    },
});

const PORT = process.env.PORT || 3000;
const mongodb = 'mongodb://localhost:27017/chat';
mongoose
    .connect(mongodb, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('connected to mongodb');
    })
    .catch((err) => {
        console.log(err);
    });

io.on('connection', (socket) => {
    // updateClientList(socket.id);

    Msg.find()
        .sort({ createdAt: -1 })
        .then((messagesData) => {
            if (messagesData.length > 0) {
                io.emit(
                    'getMessages',
                    messagesData.map((e) => {
                        e._doc._id = e._doc._id.valueOf();
                        return {
                            ...e._doc,
                        };
                    })
                );
            } else {
                console.log('no messages');
            }
        })
        .catch((err) => {
            console.log(err);
        });

    socket.on('postMessage', (msg) => {
        const message = new Msg({ ...msg });
        message.save().then(() => {
            Msg.find()
                .sort({ createdAt: -1 })
                .then((messagesData) => {
                    if (messagesData.length > 0) {
                        io.emit(
                            'getMessages',
                            messagesData.map((e) => {
                                e._doc._id = e._doc._id.valueOf();
                                console.log(e._doc, '<<<<<<<<');
                                return {
                                    ...e._doc,
                                };
                            })
                        );
                    } else {
                        console.log('no messages');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        Msg.deleteMany().then(() => {
            console.log('deleted');
        });
    });
});

server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});
