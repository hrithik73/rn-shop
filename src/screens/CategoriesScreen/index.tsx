import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import { HomeStackNavigationProps } from '@src/types/NavigationTypes';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import { getCategories } from '@src/redux/thunk/productsThunk';
import Heading from '@src/components/Heading';
import styles from './styles';

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

export default CategoriesScreen;
