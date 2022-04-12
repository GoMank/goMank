import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import LogPage from "../screens/LogPage"
import LogOrder from "../screens/LogOrder";

export default function LogNavigator() {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="History" component={LogPage} />
      <Tab.Screen name="Order" component={LogOrder} />
    </Tab.Navigator>
  );
}
