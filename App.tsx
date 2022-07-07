import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import AppNavigator from './src/navigators';
Icon.loadFont();

const App = () => {
  return <AppNavigator />;
};

export default App;
