import colors from '@src/constants/colors';
import { StyleSheet } from 'react-native';

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

export default styles;
