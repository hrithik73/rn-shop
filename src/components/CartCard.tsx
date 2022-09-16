import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { CURRENCY_SIGNS } from '../constants/AppConstants';
import colors from '../constants/colors';
import { useAppDispatch, useAppSelector } from '../redux/store';

import { removeFromCart } from '../redux/thunk/userThunks';
import { ProductType } from '../types';
import { HomeStackNavigationProps } from '../types/NavigationTypes';

type CartItemProps = {
  productData: ProductType;
};

const CartCard = ({ productData }: CartItemProps) => {
  const navigation = useNavigation<HomeStackNavigationProps>();
  const { personalDetails } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  return (
    <>
      <View style={styles.container}>
        <Pressable
          style={styles.topContainer}
          onPress={() =>
            navigation.navigate('ProductDetails', {
              productID: productData.productID,
            })
          }>
          <Image source={{ uri: productData.imgUrl }} style={styles.img} />
          <View style={styles.rightContainer}>
            <Text numberOfLines={2} style={styles.title}>
              {productData.title}
            </Text>
            <Text style={styles.price}>
              {CURRENCY_SIGNS.rupees}
              {productData.price}
            </Text>
            <Text style={styles.freeShipping}>Eligible for Free Shipping</Text>
          </View>
        </Pressable>
        <View style={styles.bottomTrayContainer}>
          <Pressable
            onPress={() =>
              dispatch(
                removeFromCart({
                  productID: productData.productID,
                  userID: personalDetails.userId,
                }),
              )
            }
            style={styles.deleteIcon}>
            <Icon name="delete" size={22} color={colors.red} />
          </Pressable>
          <Pressable style={styles.plusIcon}>
            <Icon name="plus" size={20} />
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
    borderWidth: 0.2,
    borderRadius: 10,
    margin: 5,
    marginTop: 10,
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
    height: '100%',
    justifyContent: 'center',
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
});

export default CartCard;
