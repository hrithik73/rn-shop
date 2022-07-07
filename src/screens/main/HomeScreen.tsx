import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';

const HomeScreen = () => {
  console.log('Home Screen rendered');
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Hello</Text>
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
  );
};

export default HomeScreen;
