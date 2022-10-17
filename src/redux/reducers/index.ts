import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

import user from './user';
import products from './products';
import cart from './cart';

export default combineReducers({
  user: persistReducer(persistConfig, user),
  cart: persistReducer(persistConfig, cart),
  products,
});
