import { firebase } from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import CartCard from '../../components/CartCard';
import useFirestore from '../../hooks/useFirestore';

const CartScreen = () => {
  const { getCartData } = useFirestore();
  const [cartData, setCartData] = useState<Object[]>([]);

  const user = firebase.auth().currentUser;

  const getInitialCartData = async () => {
    const initialCartData = await getCartData(user?.uid);
    setCartData(initialCartData);
  };

  useEffect(() => {
    getInitialCartData();
  }, []);

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={cartData}
        keyExtractor={item => item.productID}
        renderItem={({ item }) => <CartCard product={item} />}
      />
    </View>
  );
};

export default CartScreen;
