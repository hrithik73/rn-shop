import { firebase } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  Animated,
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import useFirestore from '../hooks/useFirestore';
import { HomeStackType } from '../types/NavigationTypes';

type CartProps =
  | {
      title: string;
      imgUrl: string;
      price: number;
      isFreeDelivery: boolean;
    }
  | any;

type NavigationProps = NativeStackNavigationProp<HomeStackType>;

const CartCard = ({ product }: CartProps) => {
  const navigation = useNavigation<NavigationProps>();
  const { removeFromCart } = useFirestore();
  const user = firebase.auth().currentUser;

  return (
    <>
      <View style={styles.container}>
        <Pressable
          style={styles.topContainer}
          onPress={() =>
            navigation.navigate('ProductDetails', {
              productID: product.productData.productID,
            })
          }>
          <Image
            source={{ uri: product.productData.imgUrl }}
            style={styles.img}
          />
          <View style={styles.rightContainer}>
            <Text numberOfLines={2} style={styles.title}>
              {product.productData.title}
            </Text>
            <Text style={styles.price}>₹{product.productData.price}</Text>
            <Text style={styles.freeShipping}>Eligible for Free Shipping</Text>
          </View>
        </Pressable>
        <View style={styles.bottomTrayContainer}>
          <Pressable
            onPress={() =>
              removeFromCart({
                productID: product.productData.productID,
                userID: user?.uid,
              })
            }
            style={styles.deleteIcon}>
            <Icon name="trash" size={20} color="red" />
          </Pressable>
          {/* <View style={styles.productQuantity}>
            <Text>{product.qnty}</Text>
          </View>
          <Pressable style={styles.plusIcon}>
            <Icon name="plus" size={20} />
          </Pressable> */}
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
