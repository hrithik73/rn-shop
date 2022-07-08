import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const CartCard = () => {
  const product = {
    title:
      "LOUIS DEVIN Analogue Women's Watch(Blue Dial Silver Colored Strap)-LD-L144-BLU-CH",
    imgUrl:
      'https://m.media-amazon.com/images/I/81jnv+iz+ZL._AC_SX444_SY639_QL65_.jpg',
    price: '299',
    isFreeDelivery: false,
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image source={{uri: product.imgUrl}} style={styles.img} />
          <View
            style={{
              flexShrink: 1,
            }}>
            <Text numberOfLines={2} style={styles.title}>
              {product.title}
            </Text>
            <Text style={styles.price}>₹{product.price}</Text>
            <Text style={{paddingTop: 10}}>Eligible for Free Shipping</Text>
          </View>
        </View>
        <View style={styles.bottomTrayContainer}>
          <View style={styles.lowerIcon}>
            <Icon name="trash" size={20} />
          </View>
          <View style={styles.productQuantity}>
            <Text>1</Text>
          </View>
          <View style={styles.plusIcon}>
            <Icon name="plus" size={20} />
          </View>
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
    justifyContent: 'center',
    borderWidth: 0.2,
    borderRadius: 10,
    margin: 5,
    marginTop: 10,
  },
  topContainer: {
    flexDirection: 'row',
  },
  container: {
    // flex: 1,
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
    fontSize: 20,
  },
  plusIcon: {
    paddingHorizontal: 30,
  },
  productQuantity: {},
  lowerIcon: {
    paddingHorizontal: 30,
  },
});

export default CartCard;
