import * as React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import PermissionsButton from "./src/components/PermissionsButton";
import Example from "./src/components/Example";
import Maps from "./src/components/Maps";
import Chat from "./src/components/Chat";
import io from "socket.io-client";
import HomeMamang from "./src/screen/HomeMamang";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./src/screen/SplashScreen";
import DrivingMap from "./src/screen/DrivingMap";
import ChatScreen from "./src/screen/ChatScreen";

import MapsOrder from "./src/screen/MapsOrder";
import SandboxMamank from "./src/screen/SandboxMamank";
import { LogBox } from 'react-native'

const Stack = createNativeStackNavigator();

const socketUrl = "https://512c-180-252-127-246.ngrok.io";
const socket = io(socketUrl);

export default function MapsMamank() {
  LogBox.ignoreLogs(['Remote debugger']);
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator initialRouteName="MapsOrder">
      <Stack.Screen
          options={{ headerShown: false }}
          name="SandboxMamank"
          component={SandboxMamank}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="MapsOrder"
          component={MapsOrder}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SplashScreen"
          component={SplashScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="HomeMamang"
          component={HomeMamang}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DrivingMap"
          component={DrivingMap}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ChatScreen"
          component={ChatScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ChatMamang"
          component={Chat}
        />
      </Stack.Navigator>
      {/* <Chat socket={socket} /> */}
      {/* <ChatScreen /> */}
      {/* <Example /> */}
      {/* <PermissionsButton /> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
