import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import AppNavigator from './src/navigators';
import { store, persistor } from './src/redux/store';

const App = () => {
  useEffect(() => {
    Icon.loadFont();
    AntIcon.loadFont();
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
