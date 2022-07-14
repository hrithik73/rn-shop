import { firebase } from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';

import CartCard from '../../components/CartCard';
import useFirestore from '../../hooks/useFirestore';
import { useFocusEffect } from '@react-navigation/native';
import Heading from '../../components/Heading';
import { CartItemProps } from '../../types';

const CartScreen = () => {
  const { getCartData } = useFirestore();
  const [cartData, setCartData] = useState<CartItemProps[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(true);

  const user = firebase.auth().currentUser;

  const getInitialCartData = async () => {
    const initialCartData = await getCartData(user?.uid);
    setCartData(initialCartData);
    setRefreshing(false);
  };

  useEffect(() => {
    getInitialCartData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      getInitialCartData();
      return () => {};
    }, []),
  );
  console.log('CartData =>>>>>>>>>>', cartData);

  return (
    <View style={styles.container}>
      <Heading>Cart</Heading>
      <FlatList
        data={cartData}
        keyExtractor={item => item.productData.productID}
        renderItem={({ item }) => (
          <CartCard productData={item.productData} qnty={item.qnty} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getInitialCartData}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default CartScreen;
