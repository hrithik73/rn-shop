import colors from '@src/constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  emptyTxt: {
    color: colors.textColor,
  },
  heading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goToShopingBtn: {
    width: 200,
  },
  checkoutCard: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.white,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    width: '100%',
    flex: 1,
    height: 100,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  paymentBtn: {
    width: '50%',
    marginHorizontal: 0,
    margin: 0,
    backgroundColor: colors.secondary,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textColor,
  },
});

export default styles;
