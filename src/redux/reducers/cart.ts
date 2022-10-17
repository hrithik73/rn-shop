import { ProductType } from '../../types';
import {
  ADD_TO_CART,
  DECREASE_QNTY,
  INCREASE_QNTY,
  REMOVE_FROM_CART,
} from '../constants';

type cartProductsType = {
  qnty: number;
} & ProductType;

type cartStateType = {
  cartProducts: cartProductsType[];
};

const initialCartState: cartStateType = {
  cartProducts: [],
};

export default (state = initialCartState, action: any) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartProducts: [...state.cartProducts, { ...action.payload }],
        // Add to cart Logic goes here
      };
    case REMOVE_FROM_CART:
      // Get the price to deduct from Total
      const price = state.cartProducts.map(product => {
        if (product.productID !== action.payload.productID) {
          return;
        }
        return product.price;
      });

      console.log('Price to Deduct', price);

      const updatedCart = state.cartProducts.filter(
        product => product.productID !== action.payload,
      );

      return {
        ...state,
        cartProducts: updatedCart,
      };

    case INCREASE_QNTY:
      const inCrementedState = state.cartProducts.map(item => {
        // If id match increment the qntity
        if (item.productID === action.payload.productID) {
          return {
            ...item,
            qnty: item.qnty + 1,
          };
        }
        return item;
      });
      console.log(inCrementedState);
      return {
        ...state,
        cartProducts: inCrementedState,
      };
    case DECREASE_QNTY:
      // increment
      const decrementedState = state.cartProducts.map(item => {
        if (item.productID === action.payload.productID) {
          return {
            ...item,
            qnty: item.qnty - 1,
          };
        }
        return item;
      });
      return {
        ...state,
        cartProducts: decrementedState,
      };
    default:
      return state;
  }
};
