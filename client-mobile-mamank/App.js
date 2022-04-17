import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import PermissionsButton from './src/components/PermissionsButton';
import Example from './src/components/Example';
import Maps from './src/components/Maps';
import Chat from './src/components/Chat';
import ChatScreen from './src/screen/ChatScreen';
import io from 'socket.io-client';

const socketUrl = 'https://512c-180-252-127-246.ngrok.io';
const socket = io(socketUrl);

export default function App() {
    return (
        <NavigationContainer>
            <Text>Open up App.js to start working on your app!</Text>
            {/* <Maps /> */}
            <Chat socket={socket} />
            {/* <ChatScreen /> */}
            {/* <Example /> */}
            {/* <PermissionsButton /> */}
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
