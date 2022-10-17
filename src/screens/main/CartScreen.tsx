import { useNavigation } from '@react-navigation/native';
import AppButton from '@src/components/Button';
import CartCard from '@src/components/CartCard';
import { CURRENCY_SIGNS } from '@src/constants/AppConstants';
import colors from '@src/constants/colors';
import { useAppSelector } from '@src/redux/store';
import { CartStackNavigatorProps } from '@src/types/NavigationTypes';
import { numberToCommaSeperatedPrice } from '@src/utils/helperFunctions';
import React, { useState } from 'react';
import {
  Button,
  FlatList,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const CartScreen = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const navigation = useNavigation<CartStackNavigatorProps>();
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
          <Text>Cart is Empty, Please Add something</Text>
          {/* <Lottie
            source={require('../../assets/67163-empty-cart.json')}
            autoPlay
            // loop
          /> */}
          <Button
            title="Go back to Shoping"
            onPress={() => navigation.navigate('ProductDetails')}
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
          customStyle={styles.paymentBtn}
          text="Checkout"
          onPress={() =>
            navigation.navigate('Payment', {
              totalPrice: getTotalPrice(),
            })
          }
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
  checkoutCard: {
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
  },
  paymentBtn: {
    width: '50%',
    marginHorizontal: 0,
    margin: 0,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CartScreen;
