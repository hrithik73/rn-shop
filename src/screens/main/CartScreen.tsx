import { firebase } from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';

import CartCard from '../../components/CartCard';
import useFirestore from '../../hooks/useFirestore';
import { useFocusEffect } from '@react-navigation/native';

const CartScreen = () => {
  const { getCartData } = useFirestore();
  const [cartData, setCartData] = useState<Object[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(true);

  const user = firebase.auth().currentUser;

  const getInitialCartData = async () => {
    const initialCartData = await getCartData(user?.uid);
    setCartData(initialCartData);
    setRefreshing(false);
  };

  useEffect(() => {
    console.log('useEffect Exicuted ->>');
    getInitialCartData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      getInitialCartData();
      return () => {};
    }, []),
  );

  return (
    <View style={{ padding: 10 }}>
      <Text style={styles.heading}>Cart</Text>
      <FlatList
        data={cartData}
        keyExtractor={item => item.productID}
        renderItem={({ item }) => <CartCard product={item} />}
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
    flex: 1,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: '500',
    // padding: 10,
    margin: 10,
  },
});

export default CartScreen;
