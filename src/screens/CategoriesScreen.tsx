import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import Heading from '../components/Heading';
import useFirestore from '../hooks/useFirestore';
import { ProductType } from '../types';
import { HomeStackNavigationProps } from '../types/NavigationTypes';

const CategoriesItem = ({ item }: any) => {
  const navigation = useNavigation<HomeStackNavigationProps>();

  return (
    <TouchableOpacity
      style={styles.categoriesItemContainer}
      onPress={() =>
        navigation.navigate('Product', {
          catID: item.catID,
          catName: item.catName,
        })
      }>
      <Image source={{ uri: item.imgUrl }} style={styles.img} />
    </TouchableOpacity>
  );
};

const CategoriesScreen = () => {
  const { getCollection } = useFirestore();
  const [categories, setCategories] = useState<ProductType[]>([]);

  const getCategoriesFromFireStore = async () => {
    const categoriesData = await getCollection('categories');
    setCategories(categoriesData);
  };

  useEffect(() => {
    getCategoriesFromFireStore();
  }, []);

  return (
    <View style={styles.container}>
      <Heading>Shop by Categories</Heading>
      <FlatList
        data={categories}
        numColumns={2}
        keyExtractor={item => item.catID}
        renderItem={({ item }) => {
          return <CategoriesItem item={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  categoriesItemContainer: {
    margin: 20,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 5,
  },
  img: {
    height: 150,
    width: 150,
    borderRadius: 10,
  },
});
export default CategoriesScreen;
