import React from 'react';
import { StyleSheet, Text, TextProps, TextStyle } from 'react-native';
import colors from '../constants/colors';

type HeadingProp =
  | {
      children: React.ReactNode;
      customStyles?: TextStyle;
    } & TextProps;

const Heading = ({ children, customStyles, ...props }: HeadingProp) => {
  return (
    <Text {...props} style={[styles.heading, customStyles]}>
      {children}
    </Text>
  );
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
