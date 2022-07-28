import React, { useEffect } from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Feather';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import AppNavigator from './src/navigators';
import { persistor, store } from './src/redux/store';
import usePushNotification from './src/hooks/usePushNotification';

const App = () => {
  // Load the Assets
  useEffect(() => {
    Icon.loadFont();
    AntIcon.loadFont();
  });

  usePushNotification();

  // useEffect(() => {
  //   messaging()
  //     .getToken(firebase.app().options?.messagingSenderId)
  //     .then(x => console.log('Token--------->', x))
  //     .catch(e => console.log(e));
  // }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
