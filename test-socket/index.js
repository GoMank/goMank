if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const Msg = require('./models/messages');
const { v4 } = require('uuid');
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    },
});

const PORT = process.env.PORT || 3000;
const mongodb = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
mongoose
    .connect(mongodb, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
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
