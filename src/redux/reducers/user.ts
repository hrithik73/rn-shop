import { UserInitStateType } from '../../types';
import {
  USER_LOGGED_IN,
  USER_SIGNED_OUT,
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from '../constants';

const initialState: UserInitStateType = {
  isLoggedIn: false,
  personalDetails: {
    email: '',
    userId: '',
  },
  cart: [],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: true,
        personalDetails: {
          userId: action.payload.userId,
          email: action.payload.email,
        },
      };
    case USER_SIGNED_OUT:
      return {
        ...state,
      };

    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, { ...action.payload }],
      };
    case REMOVE_FROM_CART:
      console.log(action.payload);
      const updatedCart = state.cart.filter(
        product => product.productID !== action.payload,
      );
      return {
        ...state,
        cart: updatedCart,
      };

    default: {
      return state;
    }
  }
};
