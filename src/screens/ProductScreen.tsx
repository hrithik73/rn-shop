import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import ProductCard from '../components/ProductCard';
import useFirestore from '../hooks/useFirestore';
import {HomeStackType} from '../types/NavigationTypes';

type ProductScreenRouteProp = RouteProp<HomeStackType, 'Product'>;

const ProductScreen = () => {
  const route = useRoute<ProductScreenRouteProp>();
  const [products, setProducts] = useState([{}]);
  const {getProductByCatID} = useFirestore();

  const getData = async () => {
    const productsData = await getProductByCatID(route.params.catID);
    setProducts(productsData);
  };

  useEffect(() => {
    getData();
  }, []);
  // console.log(products[0].title);
  return (
    <View>
      <Text>{route.params.catID}</Text>
      <FlatList
        data={products}
        style={styles.input}
        keyExtractor={item => item.title}
        renderItem={({item}) => {
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
