import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { PersistGate } from 'redux-persist/integration/react';

import usePushNotification from './src/hooks/usePushNotification';
import AppNavigator from './src/navigators';
import { persistor, store } from './src/redux/store';

const App = () => {
  // Loading fonts for Vector icons in IOS
  //TODO:- Need a Permanent fix

  useEffect(() => {
    Feather.loadFont();
    AntDesign.loadFont();
  });

  usePushNotification();

  return (
    <Provider store={store}>
      <PaperProvider>
        <StatusBar barStyle="dark-content" />
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </PaperProvider>
    </Provider>
  );
};

export default App;
