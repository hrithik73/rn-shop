import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import AppButton from '../components/Button';
import colors from '../constants/colors';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { addToCart } from '../redux/thunk/userThunks';
import {
  HomeStackType,
  RootStackNavigatorProps,
} from '../types/NavigationTypes';

type ProductScreenRouteProp = RouteProp<HomeStackType, 'ProductDetails'>;

const ProductDetailScreen = () => {
  const route = useRoute<ProductScreenRouteProp>();
  const navigation = useNavigation<RootStackNavigatorProps>();

  const dispatch = useAppDispatch();
  const { products } = useAppSelector(state => state.products);
  const { userId } = useAppSelector(state => state.user.personalDetails);

  const product = products?.find(
    (prod: any) => prod.id === route.params.productID,
  );
  console.log('UserId ---', userId);

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        product: product,
        userId: userId,
      }),
    );
    navigation.navigate('Cart', { screen: 'CartScreen' });
  };

  return (
    <ScrollView style={styles.container}>
      <Text>{product.title}</Text>
      <Image style={styles.img} source={{ uri: product?.images[0] }} />
      <View style={styles.shareIcon}>
        <Icon name="share-2" size={25} />
      </View>
      <Text>{product.description}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>Total: ₹{product.price}</Text>
        <AppButton
          text="Buy Now"
          customStyle={styles.buyNowBtn}
          onPress={() => console.log('Buy Now')}
        />
        <AppButton text="Add to Cart" onPress={addToCartHandler} />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  buyNowBtn: {
    marginVertical: 12,
    backgroundColor: colors.yellow,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  img: {
    height: 300,
    width: '100%',
    resizeMode: 'contain',
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  shareIcon: {
    position: 'absolute',
    right: 20,
    top: 65,
    backgroundColor: 'grey',
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  priceContainer: {
    marginTop: 10,
    borderColor: 'lightgrey',
    borderTopWidth: 5,
    borderBottomWidth: 5,
    height: 150,
  },
  priceText: {
    fontWeight: 'bold',
    fontSize: 15,
    paddingTop: 10,
  },
});

export default ProductDetailScreen;
