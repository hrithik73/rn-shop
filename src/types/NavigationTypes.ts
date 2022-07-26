import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProductType } from '.';

export type RootStackType = {
  Home: NavigatorScreenParams<HomeStackType>;
  Cart: NavigatorScreenParams<CartStackType>;
  User: undefined;
};

export type CartStackType = {
  CartScreen: undefined;
  ProductDetails: undefined;
};

export type HomeStackType = {
  HomeScreen: undefined;
  Product: { catID: string; catName: string };
  ProductDetails: { productID: string };
  CartScreen: undefined;
  Search: {
    searchedProduct: ProductType[];
  };
};

export type AuthStackType = {
  Login: undefined;
  SignUp: undefined;
};

export type HomeStackNavigationProps = NativeStackNavigationProp<HomeStackType>;

export type AuthStackNavigatorProps = NativeStackNavigationProp<AuthStackType>;

export type RootStackNavigatorProps = BottomTabNavigationProp<RootStackType>;
