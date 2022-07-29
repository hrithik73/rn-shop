import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import remoteConfig from '@react-native-firebase/remote-config';
import AppButton from '../../components/Button';
import PushNotification from 'react-native-push-notification';
import crashlytics from '@react-native-firebase/crashlytics';

const showNotification = () => {
  PushNotification.localNotification({
    channelId: 'testing-push-notification',
    title: 'New Message',
    message: 'You got a new message',
  });
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
    fetchRemoteData();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
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
      <AppButton
        customStyle={{ margin: 100 }}
        text="Get Push Notification"
        onPress={() => showNotification()}
      />
      <AppButton
        customStyle={{ margin: 100 }}
        text="Crash"
        onPress={() => crashlytics().crash()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginRight: 20,
  },
  offerTxtContainer: {
    height: 20,
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserScreen;
