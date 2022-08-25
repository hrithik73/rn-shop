// import useApi from '../../hooks/useApi';
import useFirestore from '../../hooks/useFirestore';
import {
  FETCHING_CATEGORIES,
  FETCHING_PRODUCTS,
  SET_CATEGORIES,
  SET_PRODUCTS,
  // UPDATE_PRODUCTS,
} from '../constants';
import { TypedDispatch } from '../store';

type GetProductProps = {
  catId: string;
  limit: number;
};

type UpdateProductsList = {
  limit: number;
  catName: string;
};

// Get initial Products
export const getInitialProducts =
  ({ catId, limit }: GetProductProps) =>
  async (dispatch: TypedDispatch) => {
    const { getProductByCatID } = useFirestore();

    dispatch({ type: FETCHING_PRODUCTS, payload: true });
    const res = await getProductByCatID(catId, limit);

    dispatch({ type: SET_PRODUCTS, payload: res });
    dispatch({ type: FETCHING_PRODUCTS, payload: false });
  };

// Update Product list
export const updateProductsList =
  ({ catName, limit }: UpdateProductsList) =>
  async (dispatch: TypedDispatch) => {
    // const { getProductByCategory } = useApi();

    dispatch({ type: FETCHING_PRODUCTS, payload: true });
    console.log(catName, limit);
    // const res = await getProductByCategory({
    //   catName: catName,
    //   limit: limit,
    // });
    // dispatch({ type: UPDATE_PRODUCTS, payload: res });
    dispatch({ type: FETCHING_PRODUCTS, payload: false });
  };

export const getCategories = () => async (dispatch: TypedDispatch) => {
  // const { getAllCategories } = useApi();
  const { getCollection } = useFirestore();

  dispatch({ type: FETCHING_CATEGORIES, payload: true });

  const res = await getCollection('categories');
  console.log(res);
  dispatch({ type: SET_CATEGORIES, payload: res });
  dispatch({ type: FETCHING_CATEGORIES, payload: false });
};
