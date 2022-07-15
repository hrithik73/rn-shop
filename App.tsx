import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';

import { Provider } from 'react-redux';
import AppNavigator from './src/navigators';
import store from './src/redux/store';

const App = () => {
  useEffect(() => {
    Icon.loadFont();
    AntIcon.loadFont();
  });

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
