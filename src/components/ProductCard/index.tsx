import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import { CURRENCY_SIGNS } from '@src/constants/AppConstants';
import colors from '@src/constants/colors';
import { HomeStackNavigationProps } from '@src/types/NavigationTypes';
import { numberToCommaSeperatedPrice } from '@src/utils/helperFunctions';
import styles from './styles';

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

export default ProductCard;
