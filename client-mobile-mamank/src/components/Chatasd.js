import { ScrollView, View, Text, TextInput } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import tw from 'twrnc';
import io from 'socket.io-client';

const socketUrl = 'https://dc90-180-252-127-246.ngrok.io';
const Chat = () => {
    const [socket, setSocket] = useState(null);
    const [conversation, setConversation] = useState([]);
    const [message, setMessage] = useState('');
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const socket = io(socketUrl);
        setSocket(socket);
        socket.on('connect', () => {
            setConnected(true);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        socket.emit('addUser', userId);
        socket.on('getUsers', (users) => {
            console.log(users);
        });
    });

    useEffect(() => {
        socket?.on('welcome', (data) => {
            console.log(data);
        });
    }, [socket]);

    useEffect(() => {
        setConversation([
            {
                id: 1,
                text: 'Hello',
                sender: 'me',
            },
            {
                id: 2,
                text: 'Hi',
                sender: 'them',
            },
            {
                id: 3,
                text: 'How are you?',
                sender: 'me',
            },
            {
                id: 4,
                text: 'I am good',
                sender: 'them',
            },
        ]);
    }, []);

    useEffect(() => {
        // nanti pake axios get /messages/:id <<< messages.id
        setMessage;
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();

        socket.emit('sendMessage', {
            message,
            userId,
            receiverId,
        });
        setConversation([
            ...conversation,
            {
                id: conversation.length + 1,
                text: message,
                sender: 'me',
            },
        ]);
        setMessage('');
    };

    return (
        <ScrollView style={{ flex: 1 }}>
            <TextInput
                value={message}
                onChangeText={(message) => setMessage(message)}
                placeholder='Type a message'
                style={tw`my-auto h-[40px] border-2`}
                onSubmitEditing={sendMessage}
            />
            {conversation.map((item) => (
                <Text key={item.id} style={tw`my-auto h-[40px]`}>
                    {item.sender === 'me' ? 'Me: ' : 'Them: '}
                    {item.text}
                </Text>
            ))}
        </ScrollView>
    );
};

export default Chat;
