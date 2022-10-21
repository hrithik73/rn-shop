import { StyleSheet } from 'react-native';
import colors from '@src/constants/colors';

const styles = StyleSheet.create({
  container: {},
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  input: {
    borderRadius: 5,
    backgroundColor: 'white',
    height: 40,
    width: '80%',
    padding: 5,
    marginHorizontal: 10,
  },
  iconContainer: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  item: {
    padding: 18,
  },
  notFoundTxt: {
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 200,
    fontSize: 18,
<<<<<<< HEAD
    color: colors.textColor,
=======
>>>>>>> 18b3a1c770d9b9770d7f0f1f3f3b346336251c12
  },
});
export default styles;
