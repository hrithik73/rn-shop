import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from '@src/constants/colors';

type ButtonProps = {
  text: string;
  onPress: any;
  customStyle?: ViewStyle;
  icon?: string;
};

const AppButton = ({ text, onPress, customStyle, icon }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, customStyle]}>
      {icon && <Icon name={icon} size={20} color={colors.white} />}
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 20,
    // Default Margin
    marginTop: 20,
    marginHorizontal: 30,
  },
  buttonText: {
    color: colors.white,
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default AppButton;
