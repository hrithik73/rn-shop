import colors from '@src/constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    marginTop: 150,
  },
  signUpInbtn: {
    backgroundColor: colors.grey,
  },
  orTxt: {
    paddingTop: 15,
    fontSize: 18,
    alignSelf: 'center',
  },
});

export default styles;
