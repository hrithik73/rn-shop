import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Feather';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import usePushNotification from './src/hooks/usePushNotification';
import AppNavigator from './src/navigators';
import { persistor, store } from './src/redux/store';

const App = () => {
  // Load the Assets
  useEffect(() => {
    Icon.loadFont();
    AntIcon.loadFont();
  });

  usePushNotification();

  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
