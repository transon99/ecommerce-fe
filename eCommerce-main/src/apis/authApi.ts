import { API_URL_AUTH } from "@/constant/apiConstant";
import useApi from "@/axios/apiConfig";

const axiosClient = useApi();

const authApi = {
  login: (data: LoginResquest) => {
    const url = `${API_URL_AUTH}/login`;
    return axiosClient.post(url, data);
  },
  loginWithFacebook: (data: SocialLoginResquest) => {
    const url = `${API_URL_AUTH}/login/facebook`;
    return axiosClient.post(url, data);
  },
};

export default authApi;
