import colors from '@src/constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    marginTop: 100,
  },
  logInbtn: {
    marginTop: 20,
    marginHorizontal: 30,
  },
  signUpInbtn: {
    backgroundColor: colors.grey,
    marginTop: 20,
    marginHorizontal: 30,
  },
  orTxt: {
    paddingTop: 15,
    fontSize: 18,
    alignSelf: 'center',
  },
});

export default styles;
