import { View, Text } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ]);
    }, []);

    const onSend = useCallback((newMessages) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
    }, []);

    return (
        <GiftedChat
            messages={messages}
            onSend={onSend}
            isTyping={true}
            user={{
                _id: 1,
            }}
        />
    );
};

export default ChatScreen;
