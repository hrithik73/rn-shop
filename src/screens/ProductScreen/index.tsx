import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';

import Heading from '@src/components/Heading';
import Loading from '@src/components/Loading';
import ProductCard from '@src/components/ProductCard';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import {
  getInitialProducts,
  updateProductsList,
} from '@src/redux/thunk/productsThunk';
import { HomeStackType } from '@src/types/NavigationTypes';
import styles from './styles';

type ProductScreenRouteProp = RouteProp<HomeStackType, 'Product'>;

const PER_PAGE_PRODUCT_LIMIT = 10;

const ProductScreen = () => {
  const dispatch = useAppDispatch();
  const { products, isFetchingProducts } = useAppSelector(
    state => state.products,
  );

  const route = useRoute<ProductScreenRouteProp>();
  const [offset, setOffSet] = useState(0);

  const fetchMoreData = async () => {
    dispatch(
      updateProductsList({
        catName: route.params.catName,
        limit: PER_PAGE_PRODUCT_LIMIT,
      }),
    );
    setOffSet(offset + 10);
  };

  useEffect(() => {
    dispatch(
      getInitialProducts({
        limit: PER_PAGE_PRODUCT_LIMIT,
        catId: route.params.catID,
      }),
    );
  }, [dispatch, route.params.catID]);

  if (isFetchingProducts && offset === 0) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Heading>{route.params.catName}</Heading>
      <FlatList
        data={products}
        style={styles.input}
        keyExtractor={({ id }) => {
          return id;
        }}
        renderItem={({ item }) => {
          return <ProductCard item={item} />;
        }}
        onEndReached={fetchMoreData}
      />
      {isFetchingProducts && (
        <View style={styles.loader}>
          <Loading />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProductScreen;
