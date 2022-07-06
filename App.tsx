import AppNavigator from './src/navigators';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import HomeScreen from './src/screens/main/HomeScreen';

const App = () => {
  return <AppNavigator />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
