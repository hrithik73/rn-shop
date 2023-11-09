import { StripeProvider } from '@stripe/stripe-react-native';
import React, { useEffect, useState } from 'react';
import { InstantSearch } from 'react-instantsearch-hooks';
import { StatusBar } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ALGOLIA_INDEX_NAME, searchClient } from '@src/configs/algolia';
import useApi from '@src/hooks/useApi';
import usePushNotification from '@src/hooks/usePushNotification';
import AppNavigator from '@src/navigators';
import { persistor, store } from '@src/redux/store';

const App = () => {
  const [publishableKey, sestPublishableKey] = useState('');
  const { getPublishableKey } = useApi();

  useEffect(() => {
    // Loading fonts for Vector icons in IOS
    // TODO:- Need a Permanent fix
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
      <StatusBar barStyle="dark-content" />
      <PersistGate loading={null} persistor={persistor}>
        <StripeProvider
          publishableKey={publishableKey}
          merchantIdentifier="merchant.identifier">
          <InstantSearch
            searchClient={searchClient}
            indexName={ALGOLIA_INDEX_NAME}>
            <AppNavigator />
          </InstantSearch>
        </StripeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
