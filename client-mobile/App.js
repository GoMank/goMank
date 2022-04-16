import { StyleSheet, Text, View, StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LogNavigator from "./src/navigators/LogNavigator";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";

import Login from "./src/screens/Login";
import LoginBio from "./src/screens/Login-bio";
import Register from "./src/screens/Register";
import Maps from "./src/screens/Maps";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <ApolloProvider client={client}>
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator
        initialRouteName="SplashHome"
        screenOptions={{
          animation: "slide_from_right",
          name: "My Homepage",
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerShown: false,
        }}
      >
        <Stack.Screen name="LoginBio" component={LoginBio} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Maps" component={Maps} />
        <Stack.Screen name="Register" component={Register} />
        {/* <Stack.Screen name="LogNavigator" component={LogNavigator} /> */}

      </Stack.Navigator>
    </NavigationContainer>
      </ApolloProvider>
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
