import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import remoteConfig from '@react-native-firebase/remote-config';
import AppButton from '../../components/Button';
import PushNotification from 'react-native-push-notification';
import crashlytics from '@react-native-firebase/crashlytics';
import firestore from '@react-native-firebase/firestore';

const showNotification = () => {
  PushNotification.localNotification({
    channelId: 'testing-push-notification',
    title: 'New Message',
    message: 'You got a new message',
  });
};

function guidGenerator() {
  let S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  );
}

const addDummyData = async () => {
  await firestore()
    .collection('products')
    .add({
      catID: '009',
      deliveryDate: 'Monday',
      imgUrl:
        'https://m.media-amazon.com/images/I/3187i1nSVTL._AC_SY1000_FMwebp_.jpg',
      isFreeDelivery: false,
      oldPrice: '20999',
      price: '14498',
      productID: guidGenerator(),
      rating: 5,
      title:
        '2021 Apple MacBook Pro (14-inch/35.97 cm, Apple M1 Pro chip with 8‑core CPU and 14‑core GPU, 16GB RAM, 512GB SSD) - Space Grey  ',
    })
    .then(() => {
      console.log('Addedddd');
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
          name="logout"
          size={20}
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
      <AppButton
        customStyle={{ marginHorizontal: 100 }}
        text="Add Dummy Data"
        onPress={() => addDummyData()}
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
