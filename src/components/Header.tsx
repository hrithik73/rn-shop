import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../constants/colors';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Search amazon.in"
        style={styles.input}
        autoCapitalize="none"
      />
      <View style={styles.iconContainer}>
        <Icon name="search" size={30} />
      </View>
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
