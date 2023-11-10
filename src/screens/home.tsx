import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Home = () => {
  return (
    <View className='flex-1 items-center justify-center bg-black '>
      <Text className='text-white font-bold text-4xl capitalize'>hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: '500',
  },
});
export default Home;
