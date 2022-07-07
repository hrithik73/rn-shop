import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import HomeScreen from '../screens/main/HomeScreen';

const Tab = createBottomTabNavigator();
const Home = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Home.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Home.Screen name="HomeScreen" component={HomeScreen} />
    </Home.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name="home" size={28} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
