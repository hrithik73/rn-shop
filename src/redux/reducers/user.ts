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
    name: '',
  },
  cart: [],
  totalAmount: 0,
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
          name: action.payload.name,
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
        totalAmount: state.totalAmount + parseInt(action.payload.price, 10),
      };
    case REMOVE_FROM_CART:
      // Get the price to deduct from Total
      const price = state.cart.map(product => {
        if (product.productID !== action.payload) {
          return;
        }
        return product.price;
      });

      console.log('Price to Deduct', price);

      const updatedCart = state.cart.filter(
        product => product.productID !== action.payload,
      );

      return {
        ...state,
        cart: updatedCart,
        totalAmount:
          state.totalAmount >= 0 ? state.totalAmount - parseInt(price, 10) : 0,
      };

    default: {
      return state;
    }
  }
};
