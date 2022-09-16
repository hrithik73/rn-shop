/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AppButton from '../../components/Button';

import CartCard from '../../components/CartCard';
import { CURRENCY_SIGNS } from '../../constants/AppConstants';
import { useAppSelector } from '../../redux/store';

const CartScreen = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const { cart: cartData, totalAmount } = useAppSelector(state => state.user);

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
      <Pressable
        style={{
          flex: 1,
          height: 200,
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View>
          <Text>Total </Text>
          <Text>
            {CURRENCY_SIGNS.rupees}
            {totalAmount}
          </Text>
        </View>
        <AppButton
          customStyle={{ width: '50%', marginHorizontal: 0, margin: 0 }}
          text="Checkout"
          onPress={() => console.log('')}
        />
      </Pressable>
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
