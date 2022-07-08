import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AppButton from '../components/Button';
import useFirestore from '../hooks/useFirestore';
import {HomeStackType} from '../types/NavigationTypes';

type ProductScreenRouteProp = RouteProp<HomeStackType, 'ProductDetails'>;

const ProductDetailScreen = () => {
  const route = useRoute<ProductScreenRouteProp>();

  const {getProductByProductId} = useFirestore();

  const [product, setProduct] = useState([{}]);

  const getProduct = async () => {
    const productTempData = await getProductByProductId(route.params.productID);
    // console.log(productTempData);
    setProduct(productTempData);
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{product.title}</Text>
      <Image style={styles.img} source={{uri: product.imgUrl}} />
      <View style={styles.shareIcon}>
        <Icon name="share-2" size={25} />
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>Total: ₹{product.price}</Text>
        <AppButton
          text="Buy Now"
          customStyle={styles.buyNowBtn}
          onPress={() => console.log('Buy Now')}
        />
        <AppButton text="Add to Cart" onPress={() => console.log('Buy Now')} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  buyNowBtn: {
    marginVertical: 12,
    backgroundColor: '#FBD816',
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
    borderRadius: 100,
  },
  shareIcon: {
    position: 'absolute',
    right: 20,
    top: 40,
    backgroundColor: 'white',
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
