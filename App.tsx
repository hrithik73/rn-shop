import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { PersistGate } from 'redux-persist/integration/react';
import { StripeProvider } from '@stripe/stripe-react-native';

import usePushNotification from './src/hooks/usePushNotification';
import AppNavigator from './src/navigators';
import { persistor, store } from './src/redux/store';
import useApi from './src/hooks/useApi';

const App = () => {
  const [publishableKey, sestPublishableKey] = useState('');
  const { getPublishableKey } = useApi();
  // Loading fonts for Vector icons in IOS
  // TODO:- Need a Permanent fix

  useEffect(() => {
    Feather.loadFont();
    AntDesign.loadFont();

    const getKey = async () => {
      const key = await getPublishableKey();
      sestPublishableKey(key);
    };
    getKey();
  }, [getPublishableKey]);

  usePushNotification();

  return (
    <Provider store={store}>
      <PaperProvider>
        <StatusBar barStyle="dark-content" />
        <PersistGate loading={null} persistor={persistor}>
          <StripeProvider
            publishableKey={publishableKey}
            merchantIdentifier="merchant.identifier">
            <AppNavigator />
          </StripeProvider>
        </PersistGate>
      </PaperProvider>
    </Provider>
  );
};

export default App;
