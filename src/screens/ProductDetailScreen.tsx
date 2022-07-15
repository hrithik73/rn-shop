import { firebase } from '@react-native-firebase/auth';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';

import AppButton from '../components/Button';
import colors from '../constants/colors';
import useFirestore from '../hooks/useFirestore';
import { addToCart } from '../redux/actions';
import { ProductType } from '../types';
import {
  HomeStackType,
  HomeStackNavigationProps,
  RootStackNavigatorProps,
} from '../types/NavigationTypes';

type ProductScreenRouteProp = RouteProp<HomeStackType, 'ProductDetails'>;

type ProductDetailScreenProps = {
  qnty: number;
  addToCartRedux: (arg0: any) => void;
  // onIncrement: () => void;
};

const ProductDetailScreen = ({
  qnty,
  addToCartRedux,
}: ProductDetailScreenProps) => {
  const route = useRoute<ProductScreenRouteProp>();
  const navigation = useNavigation<RootStackNavigatorProps>();

  const { getProductByProductId, addToCart } = useFirestore();

  const [product, setProduct] = useState<ProductType>({
    catID: '',
    deliveryDate: '',
    imgUrl: 'https://picsum.com/400/200',
    isFreeDelivery: false,
    oldPrice: '',
    price: '',
    productID: '',
    rating: 1,
    title: '',
  });

  const user = firebase.auth().currentUser;

  /**
   * Function to run on the time of component mounting and will get the product data
   **/

  const getProduct = async () => {
    const productTempData = await getProductByProductId(route.params.productID);
    setProduct(productTempData);
  };

  /**
   *  This function will add the product to cart in Firestore
   */
  const addToCartHandler = () => {
    addToCart({ product: product, userId: user?.uid });
    navigation.navigate('Cart');
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text>{product.title}</Text>
      <Image style={styles.img} source={{ uri: product.imgUrl }} />
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

const mapStateToProps = (state: any) => ({
  qnty: state.cart.qnty,
});

const mapDispatchToProps = (dispatch: any) => ({
  addToCartRedux: (product: any) => dispatch(addToCart(product)),
  // onDecrement: () => dispatch(removeFromCart()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductDetailScreen);
