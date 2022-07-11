import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';

const UserScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
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
    </SafeAreaView>
  );
};

export default UserScreen;
