import { ScrollView, View, Text, TextInput, Button } from 'react-native';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import io from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';

const socketUrl = 'https://gomank-chat.herokuapp.com/';

const Chat = () => {
    console.log(`ini chat`);
    const [socket, setSocket] = useState(null);
    const [connected, setConnected] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([{}]);
    const [userId, setUserId] = useState('');

    const connectionOptions = {
        'force new connection': true,
        reconnectionAttempts: 'Infinity', //avoid having user reconnect manually in order to prevent dead clients after a server restart
        timeout: 10000, //before connect_error and connect_timeout are emitted.
        transports: ['websocket'],
    };

    useEffect(() => {
        const socket = io(socketUrl, connectionOptions);
        setSocket(socket);
        socket.on('connect', () => {
            setConnected(true);
        });

        return () => {
            socket.disconnect();
            setMessages([]);
        };
    }, []);

    useEffect(() => {
        if (connected) {
            socket.on('getMessages', (messagesData) => {
                console.log(messagesData, '<<<<<<<<<<<<<<<<<<');
                setMessages(messagesData);
            });
        }

        return () => {
            socket?.disconnect();
        };
    }, [socket]);

    if (!connected) {
        return (
            <View>
                <Text>Connecting...!</Text>
            </View>
        );
    }

    const sendChat = () => {
        socket.emit('postMessage', {
            text: message,
            createdAt: new Date(),
            user: {
                _id: 'mamang',
            },
        });
        socket.on('getMessages', (messagesData) => {
            console.log(messagesData, '<<<<<<<<<<<<<<<<<<');
            setMessages(messagesData);
        });
        setMessage('');
    };

    return (
        <GiftedChat
            messages={messages}
            text={message}
            onInputTextChanged={(text) => setMessage(text)}
            onSend={sendChat}
            scrollToBottom={true}
            renderAvatar={null}
            placeholder='Type a message...'
            isTyping={true}
            user={{
                _id: 'mamang',
            }}
        />
    );
};

export default Chat;
