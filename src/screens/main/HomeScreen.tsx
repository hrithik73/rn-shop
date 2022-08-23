// import crashlytics from '@react-native-firebase/crashlytics';
// import { useAppSelector } from '../../redux/store';

import React from 'react';

import CategoriesScreen from '../CategoriesScreen';

const HomeScreen = () => {
  // const { personalDetails, isLoggedIn } = useAppSelector(state => state.user);

  // useEffect(() => {
  //   crashlytics().log('Home screen mounted Mounted');
  //   crashlytics().setUserId(personalDetails.userId);
  //   crashlytics().setAttribute('isLoggedIn', String(isLoggedIn));
  // }, [isLoggedIn, personalDetails.userId]);

  return (
    <>
      <CategoriesScreen />
    </>
  );
};

export default HomeScreen;
