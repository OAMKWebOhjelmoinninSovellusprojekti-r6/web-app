import axios from "axios";
import AuthService from "./auth.service";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_HOST,
});

instance.interceptors.request.use(
  (config) => {
    const token = AuthService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/user/login" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry && err.response.data.errorCode == 1) {
        originalConfig._retry = true;
        try {
          
          const rs = await instance.post("/auth/refresh-token", {
            refreshToken: AuthService.getLocalRefreshToken(),
            userId: AuthService.getCurrentUserId()
          });
          const { accessToken } = rs.data;
          AuthService.updateLocalAccessToken(accessToken);
          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);
export default instance;
