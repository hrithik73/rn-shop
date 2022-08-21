import React, { useEffect, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// import { useFocusEffect } from '@react-navigation/native';
import CartCard from '../../components/CartCard';
import useFirestore from '../../hooks/useFirestore';
import { useAppSelector } from '../../redux/store';
import { CartItemProps } from '../../types';

const CartScreen = () => {
  const { getCartData } = useFirestore();
  const [cartData, setCartData] = useState<CartItemProps[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(true);

  const user = useAppSelector(state => state.user);

  useEffect(() => {
    const getInitialCartData = async () => {
      const initialCartData = await getCartData(user.userId);
      setCartData(initialCartData);
      setRefreshing(false);
    };
    getInitialCartData();
  }, [getCartData, user.userId]);

  return (
    <SafeAreaView style={styles.container}>
      {Array.isArray(cartData) && cartData.length ? (
        <FlatList
          data={cartData}
          keyExtractor={item => item.productData.productID}
          renderItem={({ item }) => (
            <CartCard productData={item.productData} qnty={item.qnty} />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              // onRefresh={getInitialCartData}
            />
          }
        />
      ) : (
        <View style={styles.heading}>
          <Text>Cart is Empty, Please Add something</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  heading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CartScreen;
