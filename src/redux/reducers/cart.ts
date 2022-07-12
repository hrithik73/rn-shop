import { ADD_TO_CART, REMOVE_FROM_CART } from '../constants';

const initialState = {
  products: [],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_TO_CART:
      console.log(action.payload);
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        productDetails: null,
      };
    default: {
      return state;
    }
  }
};
