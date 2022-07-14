import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import useFirestore from '../hooks/useFirestore';
import { HomeStackType } from '../types/NavigationTypes';

type NavigationProps = NativeStackNavigationProp<HomeStackType>;

const CategoriesItem = ({ item }: any) => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <TouchableOpacity
      style={styles.categoriesItemContainer}
      onPress={() =>
        navigation.navigate('Product', {
          catID: item.catID,
        })
      }>
      <Image source={{ uri: item.imgUrl }} style={styles.img} />
    </TouchableOpacity>
  );
};

const CategoriesScreen = () => {
  const { getCollection } = useFirestore();
  const [categories, setCategories] = useState<Array<object>>([]);

  const getCategoriesFromFireStore = async () => {
    const categoriesData = await getCollection('categories');
    setCategories(categoriesData);
  };

  useEffect(() => {
    getCategoriesFromFireStore();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Shop by Categories</Text>
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
function query(arg0: any, arg1: any, arg2: any) {
  throw new Error('Function not implemented.');
}
