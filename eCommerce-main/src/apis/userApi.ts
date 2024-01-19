import useApi from "@/axios/apiConfig";
import { API_URL_USER } from "@/constant/apiConstant";

const axiosClient = useApi();

const userApi = {
  getCurrentUser: () => {
    const url = `${API_URL_USER}/current`;
    return axiosClient.get(url);
  },
  // loginWithFacebook: (data: SocialLoginResquest) => {
  //   const url = `${API_URL_USER}/login/facebook`;
  //   return axiosClient.post(url, data);
  // },
};

export default userApi;
