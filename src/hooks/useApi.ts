import { baseURL } from '../configs/api';
import Axios from 'axios';
import { CategoryType, ProductType } from '../types';

type GetProductByCatIDProps = {
  catId: string;
  offset: number;
  limit: number;
};

// A general perpose hook for all the api calling
const useApi = () => {
  const getAllCategories = async () => {
    let categories: CategoryType[] = [];
    const res = await Axios.get(`${baseURL}/categories`);
    categories = res.data;
    return categories;
  };

  const getProductByCatID = async ({
    catId,
    offset,
    limit,
  }: GetProductByCatIDProps) => {
    let products: ProductType[] = [];
    const res = await Axios.get(
      `${baseURL}/categories/${catId}/products?offset=${offset}&limit=${limit}`,
    );
    products = res.data;
    return products;
  };

  return { getAllCategories, getProductByCatID };
};

export default useApi;
