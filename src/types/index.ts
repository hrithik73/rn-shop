/**
    --------------Types for Reducer States are defined here--------------
*/
// User Schema
export type UserInitStateType = {
  personalDetails: {
    email: string;
    userId: string;
  };
  isLoggedIn: boolean;
  cart: ProductType[];
  location?: string;
};

export type ProductInitStateType = {
  products: ProductType[];
  isFetching: boolean;
};

/**
 * --------------Other Types are defined here-----------------------------
 */

//Product Schema
export type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: string;
    name: string;
    image: string;
  };
  images: string[];
};

export type CategoryType = {
  name: string;
  image: string;
  id: string;
};

export type CartItemProps = {
  productData: ProductType;
  qnty: number;
};
