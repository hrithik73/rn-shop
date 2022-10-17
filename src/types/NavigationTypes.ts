import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackType = {
  Home: NavigatorScreenParams<HomeStackType>;
  Cart: NavigatorScreenParams<CartStackType>;
  Search: undefined;
  User: undefined;
};

export type CartStackType = {
  CartScreen: undefined;
  ProductDetails: undefined;
  Payment: { totalPrice: number };
};

export type HomeStackType = {
  HomeScreen: undefined;
  Product: { catName: string; catID: string };
  ProductDetails: { productID: string };
  CartScreen: undefined;
  Search: undefined;
};

export type AuthStackType = {
  Login: undefined;
  SignUp: undefined;
};

export type HomeStackNavigationProps = NativeStackNavigationProp<HomeStackType>;

export type AuthStackNavigatorProps = NativeStackNavigationProp<AuthStackType>;

export type RootStackNavigatorProps = BottomTabNavigationProp<RootStackType>;

export type CartStackNavigatorProps = NativeStackNavigationProp<CartStackType>;
