import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import remoteConfig from '@react-native-firebase/remote-config';
import AppButton from '../../components/Button';
import crashlytics from '@react-native-firebase/crashlytics';

import messaging from '@react-native-firebase/messaging';

const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};

const UserScreen = () => {
  const [haveOffer, setHaveOffer] = useState(false);

  const fetchRemoteData = async () => {
    try {
      await remoteConfig().setDefaults({ haveOffer: false }); // setting default value
      await remoteConfig().fetch(10); // 10 seconds cache for testing purpose only
      const activated = await remoteConfig().fetchAndActivate(); //can read remote data if true
      if (activated) {
        const value = await remoteConfig().getBoolean('haveOffer'); //returns all values set in remote
        // console.log({ value });
        setHaveOffer(value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage.data);
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
    // fetchRemoteData();
  }, []);

  return (
    <SafeAreaView>
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          marginRight: 20,
        }}>
        <Icon
          name="log-out"
          size={30}
          color="#900"
          onPress={() =>
            auth()
              .signOut()
              .then(() => console.log('SignOut'))
          }
        />
      </View>
      {haveOffer && (
        <View style={styles.offerTxtContainer}>
          <Text>🛍 You have a Limited time special offer</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  offerTxtContainer: {
    height: 20,
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserScreen;
