import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';

import { PersistGate } from 'redux-persist/integration/react';

import usePushNotification from './src/hooks/usePushNotification';
import AppNavigator from './src/navigators';
import { persistor, store } from './src/redux/store';

const App = () => {
  useEffect(() => {
    Icon.loadFont();
  });

  usePushNotification();

  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <AppNavigator />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
