import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import moment from "moment";

const customAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

customAxios.interceptors.request.use(
  async (config: AxiosRequestConfig<any>) => {
    const accessTokenExpire = JSON.parse(
      window.localStorage.getItem("accessTokenExpire") || "{}"
    );
    // 만약 accessToken이 만료 되었다면 cookie에 저장된 refresh token을 이용하여 새로 발급받고
    // refresh Token이 없다면 localStorage를 초기화 해준다.
    if (accessTokenExpire && moment(accessTokenExpire).diff(moment()) < 0) {
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        window.localStorage.setItem(
          "accessToken",
          JSON.stringify(data.accessToken)
        );
        window.localStorage.setItem(
          "accessTokenExpire",
          JSON.stringify(data.accessTokenExpire)
        );
      } catch (e) {
        window.localStorage.setItem("accessToken", "");
        window.localStorage.setItem("accessTokenExpire", "");
      }
    }

    // 유효한 accessToken이 존재한다면 헤더에 추가해준다.
    const accessToken = JSON.parse(
      window.localStorage.getItem("accessToken") || "{}"
    );
    if (accessToken) {
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
        ...config.headers,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error.message);
  }
);

customAxios.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    if (!response.data.ok) {
      return Promise.reject(response.data.message);
    }
    return response;
  },
  (err) => {
    return Promise.reject(err.message);
  }
);

export default customAxios;
