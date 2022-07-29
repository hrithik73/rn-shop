import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import Heading from '../components/Heading';
import ProductCard from '../components/ProductCard';
import useFirestore from '../hooks/useFirestore';
import { ProductType } from '../types';
import { HomeStackType } from '../types/NavigationTypes';

type ProductScreenRouteProp = RouteProp<HomeStackType, 'Product'>;

const ProductScreen = () => {
  const route = useRoute<ProductScreenRouteProp>();
  const [limit, setLimit] = useState(10);

  const [products, setProducts] = useState<ProductType[]>([]);

  const { getProductByCatID } = useFirestore();

  const getData = async (lim: number) => {
    const productsData: ProductType[] = await getProductByCatID(
      route.params.catID,
      lim,
    );
    setProducts(productsData);
  };

  useEffect(() => {
    getData(limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  const updateLimit = () => {
    if (products.length === limit) {
      setLimit(limit + 10);
    }
  };

  return (
    <View style={styles.container}>
      <Heading>{route.params.catName}</Heading>
      <FlatList
        data={products}
        style={styles.input}
        keyExtractor={({ productID }) => {
          // generateKey(item.productID);
          return productID;
        }}
        renderItem={({ item }) => {
          return <ProductCard item={item} />;
        }}
        onEndReachedThreshold={0.2}
        onEndReached={updateLimit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    paddingHorizontal: 15,
  },
});

export default ProductScreen;
