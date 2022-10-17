import { ProductInitStateType } from '@src/types';
import {
  FETCHING_PRODUCTS,
  SET_PRODUCTS,
  UPDATE_PRODUCTS,
  SET_CATEGORIES,
  FETCHING_CATEGORIES,
} from '@src/redux/constants';

const initialState: ProductInitStateType = {
  products: [],
  categories: [],
  isFetchingProducts: false,
  isFetchingCategories: false,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case FETCHING_PRODUCTS:
      return {
        ...state,
        isProductFetching: action.payload,
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
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case FETCHING_CATEGORIES:
      return {
        ...state,
        isFetchingCategories: action.payload,
      };
    default: {
      return state;
    }
  }
};
