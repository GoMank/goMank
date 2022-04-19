import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PermissionsButton from './src/components/PermissionsButton';
import Example from './src/components/Example';
import Maps from './src/components/Maps';
import Chat from './src/components/Chat';
import io from 'socket.io-client';
import HomeMamang from './src/screen/HomeMamang';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screen/SplashScreen';
import DrivingMap from './src/screen/DrivingMap';
import ChatScreen from './src/screen/ChatScreen';
import { ApolloProvider } from '@apollo/client';
import client from './config/apollo';
const Stack = createNativeStackNavigator();

const socketUrl = 'https://512c-180-252-127-246.ngrok.io';
const socket = io(socketUrl);

export default function App() {
    return (
        <ApolloProvider client={client}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='SplashScreen'>
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name='SplashScreen'
                        component={SplashScreen}
                    />
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name='HomeMamang'
                        component={HomeMamang}
                    />
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name='DrivingMap'
                        component={DrivingMap}
                    />
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name='ChatScreen'
                        component={ChatScreen}
                    />
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name='ChatMamang'
                        component={Chat}
                    />
                </Stack.Navigator>
                {/* <Chat socket={socket} /> */}
                {/* <ChatScreen /> */}
                {/* <Example /> */}
                {/* <PermissionsButton /> */}
            </NavigationContainer>
        </ApolloProvider>
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
