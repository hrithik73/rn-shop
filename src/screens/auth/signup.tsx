import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Signup = () => {
  return (
    <View style={styles.container}>
      <Text>Sign Up</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
export default Signup;
