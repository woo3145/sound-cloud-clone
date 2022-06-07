import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import moment from "moment";

const customAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

customAxios.interceptors.request.use(
  async (config: AxiosRequestConfig<any>) => {
    const accessToken = JSON.parse(
      window.localStorage.getItem("accessToken") || ""
    );
    const accessTokenExpire = JSON.parse(
      window.localStorage.getItem("accessTokenExpire") || ""
    );
    // 만약 accessToken이 만료 되었다면 cookie에 저장된 refresh token을 이용하여 새로 발급받고
    // refresh Token이 없다면 localStorage를 초기화 해준다.
    if (accessTokenExpire && moment(accessTokenExpire).diff(moment()) < 0) {
      try {
        console.log("access token 만료되어 새로 발급합니다.");
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        window.localStorage.setItem("accessToken", data.accessToken);
        window.localStorage.setItem(
          "accessTokenExpire",
          data.accessTokenExpire
        );
        console.log("access token 발급 성공");
      } catch (e) {
        window.localStorage.setItem("accessToken", "");
        window.localStorage.setItem("accessTokenExpire", "0");
        console.log("access token 발급 실패");
      }
    }

    // 유효한 accessToken이 존재한다면 헤더에 추가해준다.
    if (accessToken) {
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
        ...config.headers,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

customAxios.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    if (response.data.error) {
      // ok: false, error: message 로 내려온 응답 처리
    }
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default customAxios;
