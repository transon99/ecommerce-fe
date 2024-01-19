import useApi from "@/axios/apiConfig";
import { API_URL_CATEGORY } from "@/constant/apiConstant";

const axiosClient = useApi();

const categoryApi = {
  getAllCategories: () => {
    const url = `${API_URL_CATEGORY}`;
    return axiosClient.get(url);
  },
  getBaseCategories: () => {
    const url = `${API_URL_CATEGORY}/base-categories`;
    return axiosClient.get(url);
  },
};

export default categoryApi;
