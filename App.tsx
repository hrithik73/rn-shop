import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { Provider } from 'react-redux';
import AppNavigator from './src/navigators';
import store from './src/redux/store';

const App = () => {
  useEffect(() => {
    Icon.loadFont();
  });

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
