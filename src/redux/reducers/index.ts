import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

import cart from '@src/redux/reducers/cart';
import products from '@src/redux/reducers/products';
import user from '@src/redux/reducers/user';

const rootReducer = combineReducers({
  user: persistReducer(persistConfig, user),
  cart: persistReducer(persistConfig, cart),
  products,
});

export default rootReducer;
