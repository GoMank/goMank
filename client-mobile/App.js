import { StyleSheet, Text, View, StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LogNavigator from "./src/navigators/LogNavigator";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";
import HomePage from "./src/screens/HomePage";
import Maps from "./src/screens/Maps";
import Login from "./src/screens/Login";
import LoginBio from "./src/screens/Login-bio";
import Register from "./src/screens/Register";
import FormOrder from "./src/screens/FormOrder";
import PaymentPage from "./src/screens/PaymentPage";
import SandboxTest from "./src/screens/SandboxTest";
import ModalOrder from "./src/components/ModalOrder";

import TabNav from "./src/navigators/TabNavigators";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <ApolloProvider client={client}>
<<<<<<< HEAD
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
=======
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <Stack.Navigator
          initialRouteName="Home"
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
          <Stack.Screen name="TabNav" component={TabNav} />
          <Stack.Screen name="ModalOrder" component={ModalOrder} />
          <Stack.Screen name="PaymentPage" component={PaymentPage} />
          <Stack.Screen name="FormOrder" component={FormOrder} headerShown={true} />
          {/* <Stack.Screen name="HomePage" component={HomePage} /> */}
          {/* <Stack.Screen name="Maps" component={Maps} /> */}
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="LogNavigator" component={LogNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
>>>>>>> a26c0e223773b9418c96674b01ace49ff6f4bcae
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
