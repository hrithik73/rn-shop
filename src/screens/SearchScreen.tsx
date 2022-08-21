import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import ProductCard from '../components/ProductCard';
import { HomeStackType } from '../types/NavigationTypes';

type ProductScreenRouteProp = RouteProp<HomeStackType, 'Search'>;

const SearchScreen = () => {
  // Todo :- Make a better search screen logic
  const route = useRoute<ProductScreenRouteProp>();
  const { searchedProduct } = route.params;
  // console.log(searchedProduct);

  return (
    <View>
      <FlatList
        data={searchedProduct}
        style={styles.list}
        keyExtractor={item => {
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
  list: {
    padding: 15,
  },
});

export default SearchScreen;
