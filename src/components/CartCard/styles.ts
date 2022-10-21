import colors from '@src/constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  bottomTrayContainer: {
    height: 40,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 0.2,
    borderRadius: 10,
    borderColor: 'gray',
    margin: 10,
  },
  topContainer: {
    flexDirection: 'row',
  },
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    margin: 5,
    paddingTop: 5,
    borderRadius: 10,
  },
  img: {
    resizeMode: 'contain',
    height: 150,
    width: 150,
  },
  title: {
    fontWeight: '500',
    fontSize: 14,
    color: colors.textColor,
  },
  price: {
    fontWeight: 'bold',
    paddingTop: 10,
    fontSize: 20,
    color: colors.textColor,
  },
  plusIcon: {
    width: 40,
    alignItems: 'center',
  },
  productQuantity: {
    width: 40,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIcon: {
    width: 40,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
  },
  rightContainer: {
    flexShrink: 1,
    padding: 10,
  },
  freeShipping: {
    paddingTop: 8,
    color: colors.textColor,
  },
  qntyTxt: {
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: 'bold',
    padding: 10,
    color: colors.textColor,
  },
});

export default styles;
