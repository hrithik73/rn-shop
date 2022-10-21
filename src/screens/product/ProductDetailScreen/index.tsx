import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';

import AppButton from '@src/components/Button/Button';
import Heading from '@src/components/Heading';
import { CURRENCY_SIGNS } from '@src/constants/AppConstants';
import colors from '@src/constants/colors';
import useFirestore from '@src/hooks/useFirestore';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import { addToCart } from '@src/redux/thunk/cartThunk';
import { ProductType } from '@src/types';
import {
  HomeStackType,
  RootStackNavigatorProps,
} from '@src/types/NavigationTypes';
import { numberToCommaSeperatedPrice } from '@src/utils/helperFunctions';
import styles from './styles';

type ProductScreenRouteProp = RouteProp<HomeStackType, 'ProductDetails'>;

const ProductDetailScreen = () => {
  const route = useRoute<ProductScreenRouteProp>();
  const navigation = useNavigation<RootStackNavigatorProps>();

  const { getProductByProductId } = useFirestore();

  const dispatch = useAppDispatch();
  const { userId } = useAppSelector(state => state.user.personalDetails);

  const [product, setProduct] = useState<ProductType>({
    catID: '',
    deliveryDate: '',
    imgUrl: '',
    isFreeDelivery: false,
    oldPrice: '',
    price: '',
    productID: '',
    rating: 1,
    title: '',
  });

  useEffect(() => {
    const getProduct = async () => {
      const prod = await getProductByProductId(route.params.productID);
      setProduct(prod);
    };
    getProduct();
  }, [getProductByProductId, route.params.productID]);

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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon name="left" size={22} onPress={() => navigation.goBack()} />
        <Text style={styles.heading}>Product detail</Text>
        <Icon
          name="shoppingcart"
          size={25}
          onPress={() =>
            navigation.navigate('Cart', {
              screen: 'CartScreen',
            })
          }
        />
      </View>
      <Image style={styles.heroImg} source={{ uri: product.imgUrl }} />
      <Heading numberOfLines={1} customStyles={styles.productTitle}>
        {product.title}
      </Heading>

      <View style={styles.reviewContainer}>
        <Icon name="star" color={colors.primary} size={18} />
        <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>
          {product.rating}
        </Text>
        <Text style={styles.ratingStyle}>(200 Reviews)</Text>
      </View>

      {/* Price Card at Bottom */}
      <View style={styles.priceCard}>
        <Text style={styles.priceTxt}>
          {CURRENCY_SIGNS.rupees}
          {numberToCommaSeperatedPrice(product.price)}
        </Text>
        <AppButton
          text="Add to Cart"
          onPress={addToCartHandler}
          customStyle={styles.addToCartBtn}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailScreen;
