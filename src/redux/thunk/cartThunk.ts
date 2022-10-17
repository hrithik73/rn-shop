import {
  ADD_TO_CART,
  DECREASE_QNTY,
  INCREASE_QNTY,
  REMOVE_FROM_CART,
} from '../constants';
import { TypedDispatch } from '../store';
import { ProductType } from '../../types';
import useFirestore from '../../hooks/useFirestore';

type AddToCartProps = {
  product: ProductType;
  userId: string;
};

type RemoveFromCartProps = {
  productID: string;
  userID: string;
};
type IncrementProductQntyType = {
  productID: string;
};

export const addToCart =
  ({ product, userId }: AddToCartProps) =>
  (dispatch: any, getState: any) => {
    // convert to data schema
    // const { products } = useAppSelector(state => state.cart);
    const cart = getState().cart;
    console.log('Product ID', product?.productID);
    console.log('Cart Products', cart.cartProducts);

    // Checking weather product already exist in cart
    const doesProductAlreadyExist = cart.cartProducts.some(
      (prod: any) => prod.productID === product.productID,
    );
    const cartProduct = {
      ...product,
      qnty: 1,
    };

    // const { addToCartInFireStore } = useFirestore();

    if (!doesProductAlreadyExist) {
      console.log('No Existing product found with the key');
      // Send to firebase
      // addToCartInFireStore({ product, userId });
      // Send to Redux Store
      dispatch({ type: ADD_TO_CART, payload: cartProduct });
    }
  };

export const removeFromCart =
  ({ productID, userID }: RemoveFromCartProps) =>
  async (dispatch: TypedDispatch) => {
    const { removeFromCartFireStore } = useFirestore();
    removeFromCartFireStore({ productID: productID, userID: userID });
    dispatch({ type: REMOVE_FROM_CART, payload: { productID } });
  };

export const incrementProductQnty =
  ({ productID }: IncrementProductQntyType) =>
  async (dispatch: TypedDispatch) => {
    dispatch({ type: INCREASE_QNTY, payload: { productID } });
  };

export const decrementProductQnty =
  ({ productID }: IncrementProductQntyType) =>
  async (dispatch: TypedDispatch) => {
    dispatch({ type: DECREASE_QNTY, payload: { productID } });
  };
