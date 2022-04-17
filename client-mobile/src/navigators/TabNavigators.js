import * as React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'


import Maps from '../screens/Maps';
import HomePage from '../screens/HomePage';
import LogPage from '../screens/LogPage';
import LogOrder from '../screens/LogOrder';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function TabNav() {
  return (
    // <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Home') {
              return (
                <MaterialCommunityIcons 
                name={focused ? 'home-variant-outline' : 'home-variant'}
                size={30} 
                color={color}
                style={{ paddingTop: 8 }}
            />
              );
            } else if (route.name === 'History') {
              return (
                <MaterialCommunityIcons 
                name={focused ? 'book-search' : 'history'}
                size={28}
                color={color}
                style={{ paddingTop: 8 }}
            />
              );
            } else if (route.name === 'Maps') {
                return (
                <MaterialCommunityIcons 
                    name={focused ? 'map-search' : 'google-maps'}
                    size={28} 
                    color={color}
                    style={{ paddingTop: 8 }}
                />
                );
              } else if (route.name === 'Orders') {
                return (
                <MaterialCommunityIcons 
                    name={focused ? 'shopping-search' : 'shopping'}
                    size={28} 
                    color={color}
                    style={{ paddingTop: 8 }}
                />
                );
              } else if (route.name === 'Chat') {
                return (
                <MaterialCommunityIcons 
                    name={focused ? 'chat-processing' : 'chat'}
                    size={28} 
                    color={color}
                    style={{ paddingTop: 8 }}
                />
                );
              }
          },
          tabBarLabelStyle: {
            fontSize: 14,
            paddingBottom:5,
          },
          tabBarStyle: { height: 60,  },
          tabBarInactiveTintColor: 'gray',
          tabBarActiveTintColor: '#003B6A',
        })}
      >

        {/* <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ tabBarBadge: 3 }}
        /> */}

        <Tab.Screen name="Maps" component={Maps} options={{headerShown: false}} />
        <Tab.Screen name="Chat" component={Maps} options={{headerShown: false}} />
        <Tab.Screen name="Home" component={HomePage} options={{headerShown: false}}/>
        <Tab.Screen name="History" component={LogPage} options={{headerShown: false}}/>
        <Tab.Screen name="Orders" component={LogOrder} options={{headerShown: false}}/>
        
      
      </Tab.Navigator>
    // </NavigationContainer>
  );
}
