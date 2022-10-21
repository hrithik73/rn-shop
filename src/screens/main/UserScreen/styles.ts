import { StyleSheet } from 'react-native';
import colors from '@src/constants/colors';

const styles = StyleSheet.create({
  avatar: {
    height: 50,
    width: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginRight: 20,
  },
  emailStyle: {
    color: 'black',
  },
  offerTxtContainer: {
    height: 20,
    marginVertical: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStyle: {
    marginHorizontal: 100,
    borderRadius: 15,
    marginVertical: 15,
  },
  logoutBtn: {
    backgroundColor: 'red',
    marginVertical: 50,
    marginHorizontal: 100,
  },
  userCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 100,
    padding: 20,
    margin: 10,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
  },
});

export default styles;
