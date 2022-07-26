import React, { useEffect } from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Feather';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import AppNavigator from './src/navigators';
import { persistor, store } from './src/redux/store';

const App = () => {
  // Load the Assests
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
