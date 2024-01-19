import axios from "axios";
import queryString from "query-string";
import Cookies from "js-cookie";

const useApi = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    headers: {
      "content-type": "application/json",
    },
    paramsSerializer: (params) => queryString.stringify(params),
  });

  instance.interceptors.request.use(
    (config) => {
      const accessToken = Cookies.get("accessToken");

      if (accessToken && !config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    async (error) => {
      const { response, config } = error;
      const status = response?.status;
      if (
        status === 403 &&
        Cookies.get("refreshToken") &&
        response.data.message === "Invalid token"
      ) {
        const refreshTokenLocal = Cookies.get("refreshToken");

        try {
          const { accessToken, refreshToken } = (
            await instance.post(`/refreshToken`, {
              refreshToken: refreshTokenLocal,
            })
          ).data;

          Cookies.set("accessToken", accessToken, { expires: 100 });
          Cookies.set("refreshToken", refreshToken, { expires: 100 });

          config.headers["Authorization"] = `Bearer ${accessToken}`;

          return Promise.resolve(instance.request(config));
        } catch (error) {
          return Promise.reject(error);
        }
      }
      // Handle errors
      // return Promise.reject(error);
      return error.response;
    }
  );

  return instance;
};

export default useApi;
