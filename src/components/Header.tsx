import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';

import colors from '../constants/colors';
import useFirestore from '../hooks/useFirestore';
import { ProductType } from '../types';
import { HomeStackNavigationProps } from '../types/NavigationTypes';

// Todo:- Implement Search Functionality better
const Header = () => {
  const [searchedProducts, setSearchedProducts] = useState<ProductType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigation = useNavigation<HomeStackNavigationProps>();

  const { getProductByName } = useFirestore();

  const searchInDB = async (newText: string) => {
    const temp = await getProductByName(newText);
    setSearchedProducts(temp);
  };

  const handleChange = (newText: React.SetStateAction<string>) => {
    setSearchTerm(newText);
  };

  const submitHandler = () => {
    searchInDB(searchTerm);
    navigation.navigate('Search', {
      searchedProduct: searchedProducts,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Search amazon.in"
        style={styles.input}
        autoCapitalize="none"
        value={searchTerm}
        onChangeText={handleChange}
        // onFocus={() => navigation.navigate('Search')}
      />
      <Pressable style={styles.iconContainer} onPress={submitHandler}>
        <Icon name="search" size={30} />
      </Pressable>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    height: 120,
  },
  input: {
    borderRadius: 5,
    backgroundColor: 'white',
    // color: 'black',
    height: 40,
    width: '80%',
    padding: 5,
    marginHorizontal: 10,
  },
  iconContainer: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
});

export default Header;
