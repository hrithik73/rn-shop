import React, { FC } from 'react';
import { StyleSheet, Text, TextStyle, View } from 'react-native';

interface HeadingProp {
  children: React.ReactNode;
  customStyles?: TextStyle;
}

const Heading: FC<HeadingProp> = ({ children, customStyles }) => {
  return <Text style={[styles.heading, customStyles]}>{children}</Text>;
};
const styles = StyleSheet.create({
  heading: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 5,
  },
});

export default Heading;
