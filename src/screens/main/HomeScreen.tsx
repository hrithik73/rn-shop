import React, { useEffect } from 'react';
import crashlytics from '@react-native-firebase/crashlytics';
import { useAppSelector } from '../../redux/store';

import CategoriesScreen from '../product/CategoriesScreen';
import Header from '../../components/Header';

const HomeScreen = () => {
  const { personalDetails, isLoggedIn } = useAppSelector(state => state.user);

  useEffect(() => {
    crashlytics().log('Home screen mounted Mounted');
    crashlytics().setUserId(personalDetails.userId);
    crashlytics().setAttribute('isLoggedIn', String(isLoggedIn));
  }, [isLoggedIn, personalDetails.userId]);

  return (
    <>
      <Header type="home" />
      <CategoriesScreen />
    </>
  );
};

export default HomeScreen;
