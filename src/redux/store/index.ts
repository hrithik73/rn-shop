import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import * as thunkMiddleware from 'redux-thunk';

import reducers from '../reducers';

let middlewares = [thunkMiddleware.default];

if (__DEV__) {
  const logger = require('redux-logger');

  const loggerMiddleware = logger.createLogger({
    duration: true,
  });

  middlewares = [...middlewares, loggerMiddleware];
}

export const store = createStore(reducers, applyMiddleware(...middlewares));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);
