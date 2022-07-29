import crashlytics from '@react-native-firebase/crashlytics';

import React, { useEffect } from 'react';
import { useAppSelector } from '../../redux/store';

import CategoriesScreen from '../CategoriesScreen';

const HomeScreen = () => {
  const user = useAppSelector(state => state.user);

  useEffect(() => {
    crashlytics().log('Home screen mounted Mounted');
    crashlytics().setUserId(user.userId);
    crashlytics().setAttribute('isLoggedIn', String(user.isLoggedIn));
  }, [user.isLoggedIn, user.userId]);

  return (
    <>
      <CategoriesScreen />
    </>
  );
};

export default HomeScreen;
