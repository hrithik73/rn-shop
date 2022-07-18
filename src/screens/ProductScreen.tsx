import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Heading from '../components/Heading';
import ProductCard from '../components/ProductCard';
import useFirestore from '../hooks/useFirestore';
import { ProductType } from '../types';
import { HomeStackType } from '../types/NavigationTypes';

type ProductScreenRouteProp = RouteProp<HomeStackType, 'Product'>;

// const generateKey = (pre: string) => {
//   return `${pre}_${new Date().getTime()}`;
// };

const ProductScreen = () => {
  const route = useRoute<ProductScreenRouteProp>();

  const [products, setProducts] = useState<ProductType[]>([]);

  // console.log('Prouctsss=========>', products);

  const { getProductByCatID } = useFirestore();

  const getData = async () => {
    const productsData: ProductType[] = await getProductByCatID(
      route.params.catID,
    );
    setProducts(productsData);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <View>
      <Heading>{route.params.catName}</Heading>
      <FlatList
        data={products}
        style={styles.input}
        keyExtractor={(item, index) => {
          // generateKey(item.productID);
          return item.productID;
        }}
        renderItem={({ item }) => {
          return <ProductCard item={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  input: {
    padding: 15,
  },
});

export default ProductScreen;
