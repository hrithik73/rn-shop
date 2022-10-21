import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import styles from './styles';

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

export default Heading;
