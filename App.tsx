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

const App = () => {
  // Loading fonts for Vector icons in IOS
  // TODO:- Need a Permanent fix
  const [publishableKey, sestPublishableKey] = useState(
    'pk_test_51LibwJSGgvJIkLhF1SYLeU7sNOwKl7IIi7hOhCetIZhQsylVGKeIQ7eFCwl0spNcoy8XkkKybkrYvnivTo4EWKAU00vmJCPIX3',
  );

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
