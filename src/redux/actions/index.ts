import useFirestore from '../../hooks/useFirestore';

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  USER_LOGGED_IN,
  USER_SIGNED_OUT,
} from '../constants';

export const userLoggedIn = () => ({
  type: USER_LOGGED_IN,
});

export const userSignedOut = () => ({
  type: USER_SIGNED_OUT,
});

export const addToCart = (product: any) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = () => ({
  type: REMOVE_FROM_CART,
});

export const addToCartAsync = () => {
  const { addToCart } = useFirestore();
};
