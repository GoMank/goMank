import { ScrollView, View, Text, TextInput, Button } from 'react-native';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import io from 'socket.io-client';
import tw from 'twrnc';
import { GiftedChat } from 'react-native-gifted-chat';

const socketUrl = 'https://mighty-lionfish-74.loca.lt';
// const socket = io(socketUrl);
const Chat = () => {
    const [socket, setSocket] = useState(null);
    const [connected, setConnected] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([{}]);
    const [userId, setUserId] = useState('');
    const [room, setRoom] = useState('');

    useEffect(() => {
        const socket = io(socketUrl);
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
                setMessages(messagesData.messagesData);
                setUserId(messagesData.id);
                console.log('messages', messagesData);
            });
        }

        return () => {
            socket?.disconnect();
        };
    }, [socket]);

    if (!connected) {
        return (
            <View>
                <Text>Connecting...</Text>
            </View>
        );
    }

    const sendChat = () => {
        socket.emit('postMessage', {
            text: message,
            createdAt: new Date(),
            user: {
                _id: 1,
            },
        });
        setMessage('');
    };

    console.log(messages);

    return (
        <GiftedChat
            messages={messages}
            text={message}
            onInputTextChanged={(text) => setMessage(text)}
            onSend={sendChat}
            scrollToBottom={true}
            placeholder='Type a message...'
            isTyping={true}
            user={{
                _id: userId,
            }}
        />
    );
};

export default Chat;
