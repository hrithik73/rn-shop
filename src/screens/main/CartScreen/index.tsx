import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import AppButton from '@src/components/Button/Button';
import CartCard from '@src/components/CartCard';
import { CURRENCY_SIGNS } from '@src/constants/AppConstants';
import { useAppSelector } from '@src/redux/store';
import { RootStackNavigatorProps } from '@src/types/NavigationTypes';
import { numberToCommaSeperatedPrice } from '@src/utils/helperFunctions';

import styles from './styles';

const CartScreen = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const navigation = useNavigation<RootStackNavigatorProps>();
  const { cartProducts: cartData } = useAppSelector(state => state.cart);

  // TODO:- Add refresh
  const onRefreshHandler = () => {
    setRefreshing(true);
    setRefreshing(false);
  };

  const getTotalPrice = () => {
    return cartData.reduce(
      (total, item) => total + parseInt(item.price, 10) * item.qnty,
      0,
    );
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
          <Text style={styles.emptyTxt}>
            Cart is Empty, Please Add something
          </Text>
          {/* <Lottie
            source={require('../../assets/67163-empty-cart.json')}
            autoPlay
            // loop
          /> */}
          <AppButton
            icon="shoppingcart"
            customStyle={styles.goToShopingBtn}
            text="Go Back to Shoping"
            onPress={() =>
              navigation.navigate('Home', {
                screen: 'HomeScreen',
              })
            }
          />
        </View>
      )}
      <Pressable style={styles.checkoutCard}>
        <View>
          <Text>Total </Text>
          <Text style={styles.totalPrice}>
            {CURRENCY_SIGNS.rupees}
            {numberToCommaSeperatedPrice(getTotalPrice())}
          </Text>
        </View>
        <AppButton
          icon="arrowright"
          customStyle={styles.paymentBtn}
          text="Checkout"
          onPress={() =>
            navigation.navigate('Cart', {
              screen: 'Payment',
              params: {
                totalPrice: getTotalPrice(),
              },
            })
          }
        />
      </Pressable>
    </SafeAreaView>
  );
};

export default CartScreen;
