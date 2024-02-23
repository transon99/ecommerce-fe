import axiosClient from '@/axios/apiConfig';
import { API_URL_USER } from '@/constant/apiConstant';

const url = API_URL_USER;
const userApi = {
  getCurrentUser: () => {
    return axiosClient.get(`${url}/current`);
  },
  // loginWithFacebook: (data: SocialLoginResquest) => {
  //   const url = `${API_URL_USER}/login/facebook`;
  //   return axiosClient.post(url, data);
  // },
};

export default userApi;
