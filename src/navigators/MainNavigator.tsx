import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import Header from '../components/Header';
import { TAB_ICON_SIZE } from '../constants/AppConstants';
import colors from '../constants/colors';
import CartScreen from '../screens/main/CartScreen';
import HomeScreen from '../screens/main/HomeScreen';
import UserScreen from '../screens/main/UserScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ProductScreen from '../screens/ProductScreen';
import SearchScreen from '../screens/SearchScreen';
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
        headerShown: false,
      }}>
      <Home.Screen name="HomeScreen" component={HomeScreen} />
      <Home.Screen name="Product" component={ProductScreen} />
      <Home.Screen name="ProductDetails" component={ProductDetailScreen} />
      <Home.Screen name="Search" component={SearchScreen} />
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
        header: () => <Header />,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: () => <Icon name="home" size={TAB_ICON_SIZE} />,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          tabBarIcon: () => <Icon name="shopping-cart" size={TAB_ICON_SIZE} />,
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Icon name="user" color={colors.black} size={TAB_ICON_SIZE} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
