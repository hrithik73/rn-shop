import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  // Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import Heading from '../components/Heading';
import useApi from '../hooks/useApi';
import { CategoryType } from '../types';
import { HomeStackNavigationProps } from '../types/NavigationTypes';

import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const CategoriesItem = ({ item }: any) => {
  const navigation = useNavigation<HomeStackNavigationProps>();

  return (
    <TouchableOpacity
      style={styles.categoriesItemContainer}
      onPress={() =>
        navigation.navigate('Product', {
          catID: item.id,
          catName: item.name,
        })
      }>
      {/* <Image source={{ uri: item.image }} style={styles.img} /> */}
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={styles.shimmerContainer}
      />
      <Heading>{item.name}</Heading>
    </TouchableOpacity>
  );
};

const CategoriesScreen = () => {
  const { getAllCategories } = useApi();
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const getCategoriesFromFireStore = async () => {
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
    };
    getCategoriesFromFireStore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log({ categories });

  return (
    <View style={styles.container}>
      <Heading>Shop by Categories</Heading>
      <FlatList
        data={categories}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return <CategoriesItem item={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  shimmerContainer: {
    height: 150,
    width: 150,
    borderRadius: 10,
    // margin: 20,
  },
});
export default CategoriesScreen;
