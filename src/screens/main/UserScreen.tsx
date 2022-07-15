import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import remoteConfig from '@react-native-firebase/remote-config';

const UserScreen = () => {
  const [haveOffer, setHaveOffer] = useState(false);

  useEffect(() => {
    // Firebase remote config
    remoteConfig()
      .setDefaults({
        haveOffer: false,
      })
      .then(() => {
        console.log('Default Value Set Successfully');
      });

    const haveOfferRef = remoteConfig().getValue('haveOffer');
    console.log(haveOfferRef.asBoolean());
    setHaveOffer(haveOfferRef.asBoolean());
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
