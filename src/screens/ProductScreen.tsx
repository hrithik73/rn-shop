import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import Heading from '../components/Heading';
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';
import { useAppDispatch, useAppSelector } from '../redux/store';
import {
  getInitialProducts,
  updateProductsList,
} from '../redux/thunk/productsThunk';
import { HomeStackType } from '../types/NavigationTypes';

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
    <View style={styles.container}>
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
