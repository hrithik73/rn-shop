import React, { useState } from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import CartCard from '../../components/CartCard';
import { useAppSelector } from '../../redux/store';

const CartScreen = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const { cart: cartData } = useAppSelector(state => state.user);

  // TODO:- Add refresh
  const onRefreshHandler = () => {
    setRefreshing(true);
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {Array.isArray(cartData) && cartData.length ? (
        <FlatList
          data={cartData}
          renderItem={({ item }) => (
            <CartCard productData={item} key={item.catID} />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefreshHandler}
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
