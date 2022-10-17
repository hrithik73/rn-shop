import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { CURRENCY_SIGNS } from '../constants/AppConstants';

import colors from '../constants/colors';
import { HomeStackNavigationProps } from '../types/NavigationTypes';
import { numberToCommaSeperatedPrice } from '../utils/helperFunctions';

const ProductCard = ({ item }: any) => {
  const navigation = useNavigation<HomeStackNavigationProps>();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('ProductDetails', { productID: item.productID })
      }>
      <Image style={styles.productImg} source={{ uri: item.imgUrl }} />
      <View style={styles.rightContainer}>
        <Text numberOfLines={3} style={styles.title}>
          {item.title}
        </Text>
        <View style={styles.ratingContainer}>
          {[...Array(item.rating)].map(() => (
            <Icon name="star" size={20} color={colors.primary} />
          ))}
        </View>

        <View style={styles.pricesContainer}>
          <Text style={styles.price}>
            {CURRENCY_SIGNS.rupees}
            {numberToCommaSeperatedPrice(item.price)}
          </Text>
          <Text style={styles.oldPrice}>
            {CURRENCY_SIGNS.rupees}
            {item.oldPrice}
          </Text>
          <Text style={styles.discount}>(19% off)</Text>
        </View>
        <Text style={styles.deliveryDate}> Get it by tomorrow </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    flexDirection: 'row',
    marginVertical: 10,
    margin: 5,
    borderRadius: 10,
  },
  productImg: {
    width: '50%',
    height: '100%',
    resizeMode: 'contain',
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontWeight: '500',
    fontSize: 15,
  },
  rightContainer: {
    flexShrink: 1,
    padding: 5,
  },
  pricesContainer: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  price: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 18,
  },
  oldPrice: {
    paddingLeft: 8,
    alignSelf: 'center',
    textDecorationLine: 'line-through',
  },
  discount: {
    fontSize: 11,
    paddingLeft: 4,
    alignSelf: 'center',
  },
  deliveryDate: {
    paddingTop: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    paddingTop: 10,
  },
});
export default ProductCard;
