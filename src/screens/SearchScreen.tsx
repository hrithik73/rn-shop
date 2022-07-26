import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { FlatList, View } from 'react-native';

import ProductCard from '../components/ProductCard';
import { HomeStackType } from '../types/NavigationTypes';

type ProductScreenRouteProp = RouteProp<HomeStackType, 'Search'>;

const SearchScreen = () => {
  // Todo :- Make a better search screen logic
  const route = useRoute<ProductScreenRouteProp>();
  const { searchedProduct } = route.params;
  console.log(searchedProduct);

  return (
    <View>
      <FlatList
        data={searchedProduct}
        style={{
          padding: 15,
        }}
        keyExtractor={(item, index) => {
          return item.productID;
        }}
        renderItem={({ item }) => {
          return <ProductCard item={item} />;
        }}
      />
    </View>
  );
};

export default SearchScreen;
