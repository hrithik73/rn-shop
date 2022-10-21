<<<<<<< HEAD
import colors from '@src/constants/colors';
=======
>>>>>>> 18b3a1c770d9b9770d7f0f1f3f3b346336251c12
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 150,
    flexDirection: 'row',
    marginVertical: 10,
    margin: 5,
    borderRadius: 10,
  },
  productImg: {
    width: '50%',
    height: '100%',
    resizeMode: 'contain',
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontWeight: '500',
    fontSize: 15,
<<<<<<< HEAD
    color: colors.textColor,
=======
>>>>>>> 18b3a1c770d9b9770d7f0f1f3f3b346336251c12
  },
  rightContainer: {
    flexShrink: 1,
    padding: 5,
  },
  pricesContainer: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  price: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 18,
  },
  oldPrice: {
    paddingLeft: 8,
    alignSelf: 'center',
    textDecorationLine: 'line-through',
<<<<<<< HEAD
    color: colors.textColor,
=======
>>>>>>> 18b3a1c770d9b9770d7f0f1f3f3b346336251c12
  },
  discount: {
    fontSize: 11,
    paddingLeft: 4,
    alignSelf: 'center',
<<<<<<< HEAD
    color: colors.textColor,
  },
  deliveryDate: {
    paddingTop: 10,
    color: colors.black,
=======
  },
  deliveryDate: {
    paddingTop: 10,
>>>>>>> 18b3a1c770d9b9770d7f0f1f3f3b346336251c12
  },
  ratingContainer: {
    flexDirection: 'row',
    paddingTop: 10,
  },
});
export default styles;
