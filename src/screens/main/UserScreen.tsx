/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Modal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import remoteConfig from '@react-native-firebase/remote-config';
import AppButton from '../../components/Button';
import PushNotification from 'react-native-push-notification';
import crashlytics from '@react-native-firebase/crashlytics';
import firestore from '@react-native-firebase/firestore';
import colors from '../../constants/colors';
import { Portal } from 'react-native-paper';
import { useAppSelector } from '../../redux/store';

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
  const { personalDetails } = useAppSelector(state => state.user);
  const [visible, setVisible] = useState(false);

  // console.log({ personalDetails });
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

  const logoutHandler = () => {
    auth()
      .signOut()
      .then(() => console.log('Successfully Signout'));
  };

  useEffect(() => {
    fetchRemoteData();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.userCard}>
        <View style={styles.avatar}>
          <Icon name="user" size={35} />
        </View>
        <View>
          <Text>{personalDetails.email}</Text>
        </View>
        <Icon
          name="logout"
          size={25}
          color="#900"
          onPress={() => setVisible(true)}
        />
      </View>
      {haveOffer && (
        <View style={styles.offerTxtContainer}>
          <Text>🛍 You have a Limited time special offer</Text>
        </View>
      )}
      <AppButton
        icon="bells"
        customStyle={styles.btnStyle}
        text="Push Notification"
        onPress={() => showNotification()}
      />
      <AppButton
        icon="warning"
        customStyle={styles.btnStyle}
        text="Crash"
        onPress={() => crashlytics().crash()}
      />
      <AppButton
        icon="addfile"
        customStyle={styles.btnStyle}
        text="Add Dummy Data"
        onPress={() => addDummyData()}
      />

      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          dismissable
          contentContainerStyle={styles.containerStyle}>
          <Text style={{ textAlign: 'center' }}>
            Are You Sure want to Logout?
          </Text>
          <AppButton
            icon="logout"
            customStyle={styles.logoutBtn}
            text="Logout"
            onPress={logoutHandler}
          />
        </Modal>
      </Portal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  avatar: {
    height: 50,
    width: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginRight: 20,
  },
  offerTxtContainer: {
    height: 20,
    marginVertical: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStyle: {
    marginHorizontal: 100,
    borderRadius: 15,
    marginVertical: 15,
  },
  logoutBtn: {
    backgroundColor: 'red',
    marginVertical: 50,
    marginHorizontal: 100,
  },
  userCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 100,
    padding: 20,
    margin: 10,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
  },
});

export default UserScreen;
