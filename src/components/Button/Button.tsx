import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from '@src/constants/colors';
import styles from './styles';

type ButtonProps = {
  text: string;
  onPress: () => void;
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

export default AppButton;
