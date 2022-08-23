import useApi from '../../hooks/useApi';
import { FETCHING_PRODUCTS, SET_PRODUCTS, UPDATE_PRODUCTS } from '../constants';
import { TypedDispatch } from '../store';

type GetProductProps = {
  catId: string;
  limit: number;
};
type UpdateProductsList = {
  limit: number;
  offset: number;
  catId: string;
};

// Get initial Products
export const getInitialProducts =
  ({ catId, limit }: GetProductProps) =>
  async (dispatch: TypedDispatch) => {
    const { getProductByCatID } = useApi();

    dispatch({ type: FETCHING_PRODUCTS, payload: true });

    const res = await getProductByCatID({
      catId: catId,
      offset: 0,
      limit: limit,
    });

    dispatch({ type: SET_PRODUCTS, payload: res });
    dispatch({ type: FETCHING_PRODUCTS, payload: false });
  };

// Update Product list
export const updateProductsList =
  ({ catId, limit, offset }: UpdateProductsList) =>
  async (dispatch: TypedDispatch) => {
    const { getProductByCatID } = useApi();

    dispatch({ type: FETCHING_PRODUCTS, payload: true });

    const res = await getProductByCatID({
      catId: catId,
      limit: limit,
      offset: offset,
    });

    dispatch({ type: UPDATE_PRODUCTS, payload: res });
    dispatch({ type: FETCHING_PRODUCTS, payload: false });
  };
