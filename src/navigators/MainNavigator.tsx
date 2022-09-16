import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

import Header from '../components/Header';
import colors from '../constants/colors';
import CartScreen from '../screens/main/CartScreen';
import HomeScreen from '../screens/main/HomeScreen';
import UserScreen from '../screens/main/UserScreen';
import ProductDetailScreen from '../screens/product/ProductDetailScreen';
import ProductScreen from '../screens/product/ProductScreen';
import SearchScreen from '../screens/main/SearchScreen';
import {
  CartStackType,
  HomeStackType,
  RootStackType,
} from '../types/NavigationTypes';

const Tab = createBottomTabNavigator<RootStackType>();
const Home = createNativeStackNavigator<HomeStackType>();
const Cart = createNativeStackNavigator<CartStackType>();

const HomeNavigator = () => {
  return (
    <Home.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        // headerShown: false,
      }}>
      <Home.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ header: () => <Header type="home" /> }}
      />
      <Home.Screen
        name="Product"
        component={ProductScreen}
        options={{ headerShown: false }}
      />
      <Home.Screen
        name="ProductDetails"
        component={ProductDetailScreen}
        options={{ headerShown: false }}
      />
      <Home.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
    </Home.Navigator>
  );
};

const CartNavigator = () => {
  return (
    <Cart.Navigator
      initialRouteName="CartScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Cart.Screen name="CartScreen" component={CartScreen} />
      <Cart.Screen name="ProductDetails" component={ProductDetailScreen} />
    </Cart.Navigator>
  );
};
const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="search1" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="shoppingcart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
