export type ProductType = {
  catID: string;
  deliveryDate: string;
  imgUrl: string;
  isFreeDelivery: boolean;
  oldPrice: string;
  price: string;
  productID: string;
  rating: number;
  title: string;
};

export type CategoryType = {
  catID: string;
  catName: string;
  imgUrl: string;
};

export type CartItemProps = {
  productData: ProductType;
  qnty: number;
};
