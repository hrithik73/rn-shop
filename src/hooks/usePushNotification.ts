import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import firebase from '@react-native-firebase/app';
import PushNotification, { Importance } from 'react-native-push-notification';
import { Platform } from 'react-native';

const CHANNEL_ID = 'testing-push-notification';

const showNotification = (
  notification: FirebaseMessagingTypes.Notification,
) => {
  PushNotification.localNotification({
    channelId: CHANNEL_ID,
    title: notification.title,
    message: notification.body!,
  });
};

const usePushNotification = () => {
  PushNotification.createChannel(
    {
      channelId: CHANNEL_ID, // (required)
      channelName: 'My channel', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      playSound: false, // (optional) default: true
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  const requestPermissions = () => {
    firebase
      .messaging()
      .requestPermission()
      .then((status: FirebaseMessagingTypes.AuthorizationStatus) => {
        if (status === 1) {
          console.log('Authorized');
          onMessage();
        } else {
          console.log('Not authorized');
        }
      })
      .catch(e => console.log(e));
  };

  const onMessage = () => {
    firebase.messaging().onMessage(response => {
      console.log('inside onMessage =>>>>>>>>>>>>>>>>>>>>>');
      console.log(JSON.stringify({ response }));
      showNotification(response.notification!);
    });
  };

  const registerForRemoteMessages = () => {
    firebase
      .messaging()
      .registerDeviceForRemoteMessages()
      .then(() => {
        console.log('Registered');
        requestPermissions();
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    if (Platform.OS === 'ios') {
      registerForRemoteMessages();
    } else {
      // onMessage();
    }
  }, []);
};

export default usePushNotification;
