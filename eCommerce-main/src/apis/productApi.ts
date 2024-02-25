import axiosClient from "@/axios/apiConfig";
import { API_URL_PRODUCT } from "@/constant/apiConstant";

const url = API_URL_PRODUCT;

const productApi = {
  getProductByCategory: (categoryId: string | null) => {
    return axiosClient.get(`${url}/filter-by-cat?category=${categoryId}`);
  },
  getById: (id: string | undefined) => {
    return axiosClient.get(`${url}/${id}`);
  },
};

export default productApi;
