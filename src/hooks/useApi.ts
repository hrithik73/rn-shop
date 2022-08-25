import { baseURL } from '../configs/api';
import Axios from 'axios';
import { CategoryType, ProductType } from '../types';

type GetProductByCategory = {
  catName: string;
  limit: number;
};

// A general perpose hook for all the api calling
const useApi = () => {
  const getAllCategories = async () => {
    let categories: CategoryType[] = [];
    try {
      const res = await Axios.get(`${baseURL}/products/categories`);
      categories = res.data;
    } catch (error) {
      console.log(error);
    }
    // console.log(categories);
    return categories;
  };

  const getProductByCategory = async ({
    catName,
    limit,
  }: GetProductByCategory) => {
    let products: ProductType[] = [];
    console.log(`${baseURL}/products/category/${catName}/?limit=${limit}`);

    try {
      const res = await Axios.get(
        `${baseURL}/category/${catName}/products?limit=${limit}`,
      );
      console.log('Data from product ', res);
      products = res.data;
    } catch (error) {
      console.log(error);
    }

    return products;
  };

  return { getAllCategories, getProductByCategory };
};

export default useApi;
