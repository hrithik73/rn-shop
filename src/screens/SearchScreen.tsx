import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { FlatList, View } from 'react-native';
import ProductCard from '../components/ProductCard';
import { HomeStackType } from '../types/NavigationTypes';

type ProductScreenRouteProp = RouteProp<HomeStackType, 'Search'>;

const SearchScreen = () => {
  const route = useRoute<ProductScreenRouteProp>();
  const { searchedProduct } = route.params;
  return (
    <View>
      {/* <FlatList
        data={searchedProduct}
        // style={styles.input}
        style={{
          padding: 15,
        }}
        keyExtractor={(item, index) => {
          // generateKey(item.productID);
          return item.productID;
        }}
        renderItem={({ item }) => {
          return <ProductCard item={item} />;
        }}
      /> */}
    </View>
  );
};

export default SearchScreen;
