import auth from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';
import remoteConfig from '@react-native-firebase/remote-config';
import AppButton from '@src/components/Button/Button';
import { useAppSelector } from '@src/redux/store';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import PushNotification from 'react-native-push-notification';
import Icon from 'react-native-vector-icons/AntDesign';
import { addDummyData } from '@src/utils/helperFunctions';
import styles from './styles';

const showNotification = () => {
  PushNotification.localNotification({
    channelId: 'testing-push-notification',
    title: 'New Message',
    message: 'You got a new message',
  });
};

const UserScreen = () => {
  const [haveOffer, setHaveOffer] = useState(false);
  const { personalDetails } = useAppSelector(state => state.user);
  const [visible, setVisible] = useState(false);
  console.log(personalDetails);
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
          <Text style={styles.emailStyle}>{personalDetails.email}</Text>
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

export default UserScreen;
