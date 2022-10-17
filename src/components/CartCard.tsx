import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import { CURRENCY_SIGNS } from '@src/constants/AppConstants';
import colors from '@src/constants/colors';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import {
  decrementProductQnty,
  incrementProductQnty,
} from '@src/redux/thunk/cartThunk';
import { removeFromCart } from '@src/redux/thunk/userThunks';
import { ProductType } from '@src/types';
import { HomeStackNavigationProps } from '@src/types/NavigationTypes';
import { numberToCommaSeperatedPrice } from '@src/utils/helperFunctions';

type cartProductsType = {
  qnty: number;
} & ProductType;

type CartItemProps = {
  productData: cartProductsType;
};

const CartCard = ({ productData }: CartItemProps) => {
  console.log({ productData });
  const navigation = useNavigation<HomeStackNavigationProps>();
  const { personalDetails } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const navigateHandler = () => {
    navigation.navigate('ProductDetails', {
      productID: productData.productID,
    });
  };
  const productRemoveHandler = () => {
    dispatch(
      removeFromCart({
        productID: productData.productID,
        userID: personalDetails.userId,
      }),
    );
  };
  const incrementQntyHandler = () => {
    dispatch(
      incrementProductQnty({
        productID: productData.productID,
      }),
    );
  };
  const decrementQntyHandler = () => {
    dispatch(
      decrementProductQnty({
        productID: productData.productID,
      }),
    );
  };

  return (
    <>
      <View style={styles.container}>
        <Pressable style={styles.topContainer} onPress={navigateHandler}>
          <Image source={{ uri: productData.imgUrl }} style={styles.img} />
          <View style={styles.rightContainer}>
            <Text numberOfLines={2} style={styles.title}>
              {productData.title}
            </Text>
            <Text style={styles.price}>
              {CURRENCY_SIGNS.rupees}
              {numberToCommaSeperatedPrice(productData.price)}
            </Text>
            <Text style={styles.freeShipping}>Eligible for Free Shipping</Text>
          </View>
        </Pressable>
        <View style={styles.bottomTrayContainer}>
          {productData.qnty === 1 ? (
            <Pressable onPress={productRemoveHandler} style={styles.deleteIcon}>
              <Icon name="delete" size={22} color={colors.red} />
            </Pressable>
          ) : (
            <Pressable style={styles.plusIcon}>
              <Icon name="minus" size={20} onPress={decrementQntyHandler} />
            </Pressable>
          )}

          <Text style={styles.qntyTxt}>{productData.qnty}</Text>
          <Pressable style={styles.plusIcon}>
            <Icon name="plus" size={20} onPress={incrementQntyHandler} />
          </Pressable>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  bottomTrayContainer: {
    height: 40,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',

    borderWidth: 0.2,
    borderRadius: 10,
    borderColor: 'gray',
    margin: 10,
  },
  topContainer: {
    flexDirection: 'row',
  },
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    margin: 5,
    paddingTop: 5,
    borderRadius: 10,
  },
  img: {
    resizeMode: 'contain',
    height: 150,
    width: 150,
  },
  title: {
    fontWeight: '500',
    fontSize: 14,
  },
  price: {
    fontWeight: 'bold',
    paddingTop: 10,
    fontSize: 20,
  },
  plusIcon: {
    width: 40,

    alignItems: 'center',
  },
  productQuantity: {
    width: 40,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIcon: {
    width: 40,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
  },
  rightContainer: {
    flexShrink: 1,
    padding: 10,
  },
  freeShipping: {
    paddingTop: 8,
  },
  qntyTxt: {
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: 'bold',
    padding: 10,
  },
});

export default CartCard;
