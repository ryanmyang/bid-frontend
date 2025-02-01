import React from 'react';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import { View, Text } from 'react-native'; // placeholders for Chat, List, Profile
import Ionicons from '@expo/vector-icons/Ionicons'; // or any icon library
import ChatListScreen from '@/screens/chat/ChatListScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import YourTasksScreen from '@/screens/YourTasksScreen';
import ChatDetailScreen from '@/screens/chat/ChatDetailScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();


function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="Search" component={SearchScreen} />
    </HomeStack.Navigator>
  );
}

function ChatStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="ChatMain" component={ChatListScreen} />
      <HomeStack.Screen name="ChatDetail" component={ChatDetailScreen} />
    </HomeStack.Navigator>
  );
}
export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#000' },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#888',
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home';
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Chat') iconName = 'chatbubble-outline';
          else if (route.name === 'List') iconName = 'list-outline';
          else if (route.name === 'Profile') iconName = 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Chat" component={ChatStackNavigator} />
      <Tab.Screen name="Your Tasks" component={YourTasksScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
