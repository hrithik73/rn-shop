import React from 'react';
import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import colors from '../constants/colors';

type ButtonProps = {
  text: string;
  onPress: any;
  customStyle: ViewStyle;
};

const AppButton = ({text, onPress, customStyle}: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, customStyle]}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    paddingVertical: 10,
    marginHorizontal: 30,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default AppButton;
