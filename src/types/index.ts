/**
    --------------Types for Reducer States are defined here--------------
*/
// User Schema
export type UserInitStateType = {
  personalDetails: {
    email: string;
    userId: string;
    name: string;
  };
  isLoggedIn: boolean;
};

export type ProductInitStateType = {
  products: ProductType[];
  categories: CategoryType[];
  isFetchingProducts: boolean;
  isFetchingCategories: boolean;
};

/**
 * --------------Other Types are defined here-----------------------------
 */

//Product Schema
export type ProductType = {
  catID: string;
  deliveryDate: String;

  imgUrl: string;
  isFreeDelivery: boolean;
  oldPrice: string;
  price: string;
  productID: string;
  rating: number;
  title: string;
};

export type CategoryType = {
  name: string;
  image: string;
  catId: string;
};

export type CartItemProps = {
  productData: ProductType;
  qnty: number;
};
