import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const config = {
  screens: {
    Home: {
      screens: {
        ProductDetails: {
          path: 'product/:productID',
        },
      },
    },
    User: 'user',
  },
};
const linking = {
  prefixes: ['rnshop://', 'https://rnshop.com'],
  config,
};

const AppNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    //Todo:- Add Lottie View here
    return (
      <LottieView source={require('../assets/loading.json')} autoPlay loop />
    );
  }

  return (
    <NavigationContainer
      linking={linking}
      fallback={<ActivityIndicator color="blue" size="large" />}>
      {user ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
