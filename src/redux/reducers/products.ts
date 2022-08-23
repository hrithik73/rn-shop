import { ProductInitStateType } from '../../types';
import { FETCHING_PRODUCTS, SET_PRODUCTS, UPDATE_PRODUCTS } from '../constants';

const initialState: ProductInitStateType = {
  products: [],
  isFetching: false,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case FETCHING_PRODUCTS:
      return {
        ...state,
        isFetching: action.payload,
      };
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...state.products, ...action.payload],
      };
    default: {
      return state;
    }
  }
};
