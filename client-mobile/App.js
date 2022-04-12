import { StyleSheet, Text, View, StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LogNavigator from "./src/navigators/LogNavigator";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
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
        <Stack.Screen name="LogNavigator" component={LogNavigator} />

      </Stack.Navigator>
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
