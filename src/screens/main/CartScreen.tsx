/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
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
import colors from '../../constants/colors';
import { useAppSelector } from '../../redux/store';
import { CartStackNavigatorProps } from '../../types/NavigationTypes';

const CartScreen = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const navigation = useNavigation<CartStackNavigatorProps>();
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
          style={{
            marginBottom: 100,
          }}
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
          position: 'absolute',
          bottom: 0,
          backgroundColor: colors.white,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          width: '100%',
          flex: 1,
          height: 100,
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
          onPress={() => navigation.navigate('Payment')}
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
