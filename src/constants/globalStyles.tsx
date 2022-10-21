import { StyleSheet } from 'react-native';
import colors from './colors';

const globalStyles = StyleSheet.create({
  authHeading: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 50,
    textAlign: 'center',
    color: colors.textColor,
  },
});

export default globalStyles;
