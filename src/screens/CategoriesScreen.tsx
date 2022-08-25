import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import Heading from '../components/Heading';
import { HomeStackNavigationProps } from '../types/NavigationTypes';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { Text } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { getCategories } from '../redux/thunk/productsThunk';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const CategoriesItem = ({ item }: any) => {
  const navigation = useNavigation<HomeStackNavigationProps>();
  return (
    <TouchableOpacity
      style={styles.categoriesItemContainer}
      onPress={() =>
        navigation.navigate('Product', {
          catName: item.catName,
          catID: item.catID,
        })
      }>
      <FastImage source={{ uri: item.imgUrl }} style={[styles.img]} />
      <Text style={styles.heading}>{item.catName}</Text>
    </TouchableOpacity>
  );
};

const ShimmerView = () => {
  const dummyData = [{}, {}, {}, {}, {}];
  return (
    <FlatList
      data={dummyData}
      numColumns={2}
      renderItem={({ index }) => {
        return (
          <View style={styles.categoriesItemContainer}>
            <ShimmerPlaceholder
              key={index}
              LinearGradient={LinearGradient}
              style={styles.shimmerContainer}
            />
          </View>
        );
      }}
    />
  );
};

const CategoriesScreen = () => {
  const dispatch = useAppDispatch();
  const { categories, isFetchingCategories } = useAppSelector(
    state => state.products,
  );

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Heading>Shop by Categories</Heading>
      {isFetchingCategories ? (
        <ShimmerView />
      ) : (
        <FlatList
          data={categories}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <CategoriesItem
                item={item}
                isFetchingCategories={isFetchingCategories}
              />
            );
          }}
        />
      )}
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
    fontWeight: '400',
    fontSize: 15,
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
  },
});
export default CategoriesScreen;
