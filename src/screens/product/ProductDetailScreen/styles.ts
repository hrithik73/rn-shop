import colors from '@src/constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 12,
  },
  heading: {
    fontSize: 18,
  },
  heroImg: {
    marginTop: 50,
    resizeMode: 'contain',
    height: '50%',
    width: '100%',
  },
  priceCard: {
    position: 'absolute',
    bottom: 0,
    height: 100,
    width: '100%',
    borderRadius: 30,
    backgroundColor: colors.grey,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  productTitle: {
    textAlign: 'left',
    margin: 10,
  },
  priceTxt: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  addToCartBtn: {
    width: 200,
    marginTop: 0,
    marginHorizontal: 0,
  },
  reviewContainer: {
    flexDirection: 'row',
    margin: 10,
  },
<<<<<<< HEAD
  ratingStyle: {
    fontWeight: '200',
    fontSize: 12,
    left: 10,
    color: colors.textColor,
  },
=======
>>>>>>> 18b3a1c770d9b9770d7f0f1f3f3b346336251c12
});

export default styles;
