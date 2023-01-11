/**
    --------------Types for Reducer States are defined here--------------
*/
// User Schema
export interface IUserInitState {
  personalDetails: {
    email: string;
    userId: string;
    name: string;
  };
  isLoggedIn: boolean;
}

export interface IProductInitState {
  products: ProductType[];
  categories: CategoryType[];
  isFetchingProducts: boolean;
  isFetchingCategories: boolean;
}

/**
 * --------------Other Types are defined here-----------------------------
 */

//Product Schema
export interface ProductType {
  catID: string;
  deliveryDate: String;

  imgUrl: string;
  isFreeDelivery: boolean;
  oldPrice: string;
  price: string;
  productID: string;
  rating: number;
  title: string;
}

export interface CategoryType {
  name: string;
  image: string;
  catId: string;
}

export interface CartItemProps {
  productData: ProductType;
  qnty: number;
}
