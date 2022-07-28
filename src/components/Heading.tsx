import React from 'react';
import { StyleSheet, Text, TextStyle, View } from 'react-native';
import colors from '../constants/colors';

interface HeadingProp {
  children: React.ReactNode;
  customStyles?: TextStyle;
}

const Heading = ({ children, customStyles }: HeadingProp) => {
  return <Text style={[styles.heading, customStyles]}>{children}</Text>;
};
const styles = StyleSheet.create({
  heading: {
    fontWeight: 'bold',
    color: colors.black,
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 5,
  },
});

export default Heading;
