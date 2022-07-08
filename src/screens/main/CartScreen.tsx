import React from 'react';
import {Text, View} from 'react-native';
import CartCard from '../../components/CartCard';

const CartScreen = () => {
  return (
    <View style={{padding: 10}}>
      <CartCard />
      <CartCard />
      <CartCard />
      <CartCard />
      <CartCard />
      <CartCard />
      <CartCard />
    </View>
  );
};

export default CartScreen;
