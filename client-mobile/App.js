import { StyleSheet, Text, View, StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LogNavigator from "./src/navigators/LogNavigator";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";
import HomePage from "./src/screens/HomePage";
import Maps from "./src/screens/Maps";
import LoginBio from "./src/screens/Login-bio";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import FormOrder from "./src/screens/FormOrder";
import PaymentPage from "./src/screens/PaymentPage";
import SandboxTest from "./src/screens/SandboxTest";
import { LogBox } from 'react-native'
import MapsClient from "./src/screens/MapsClient";
import ChatClient from "./src/components/ChatClient";
import MidtransPayment from "./src/components/MidtransPayment";
import XenditPayment from "./src/components/XenditPayment";
import ScanBarcode from "./src/components/ScanBarcode";
import MapsDetail from "./src/components/MapsDetail";

import TabNav from "./src/navigators/TabNavigators";
LogBox.ignoreLogs(['Remote debugger']);

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
          {/* <Stack.Screen name="SandboxTest" component={SandboxTest} /> */}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="TabNav" component={TabNav} />
          <Stack.Screen name="ScanBarcode" component={ScanBarcode} />
          <Stack.Screen name="ChatClient" component={ChatClient} />
          <Stack.Screen name="mapsClient" component={MapsClient} />
          <Stack.Screen name="MapsDetail" component={MapsDetail} />
          {/* <Stack.Screen name="LoginBio" component={LoginBio} /> */}
          <Stack.Screen name="PaymentPage" component={PaymentPage} />
          <Stack.Screen name="FormOrder" component={FormOrder} />
          <Stack.Screen name="XenditPayment" component={XenditPayment} />
          <Stack.Screen name="MidtransPayment" component={MidtransPayment} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="LogNavigator" component={LogNavigator} />
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
