import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

import Heading from '../components/Heading';
import ProductCard from '../components/ProductCard';
import colors from '../constants/colors';
import useFirestore from '../hooks/useFirestore';
import { ProductType } from '../types';
import { HomeStackType } from '../types/NavigationTypes';

type ProductScreenRouteProp = RouteProp<HomeStackType, 'Product'>;

const ProductScreen = () => {
  const route = useRoute<ProductScreenRouteProp>();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  console.log('================>', loading);
  const [products, setProducts] = useState<ProductType[]>([]);

  const { getProductByCatID } = useFirestore();

  const getData = async (lim: number) => {
    const productsData: ProductType[] = await getProductByCatID(
      route.params.catID,
      lim,
      (val: boolean) => {
        setLoading(val);
      },
    );
    setProducts(productsData);
  };

  useEffect(() => {
    setLoading(true);
    getData(limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  const updateLimit = () => {
    if (products.length === limit) {
      setLimit(limit + 10);
    }
  };
  const Footer = () => {
    return loading ? (
      <View style={styles.loader}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    ) : null;
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
        ListFooterComponent={Footer}
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
  loader: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductScreen;
