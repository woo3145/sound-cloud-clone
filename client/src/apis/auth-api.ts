import axios, { AxiosError, AxiosResponse } from "axios";
import customAxios from "../utils/customAxios";

interface SignInParam {
  email: string;
  password: string;
}

export const signInApi = ({ email, password }: SignInParam) => {
  return customAxios.post(
    "/auth/login",
    {
      email,
      password,
    },
    { withCredentials: true }
  );
};

interface SignUpParam {
  email: string;
  password: string;
  name: string;
}

export const signUpApi = async ({ email, password, name }: SignUpParam) => {
  return await axios
    .post(
      "http://localhost:4000/auth/register",
      {
        email,
        password,
        name,
      },
      { withCredentials: true }
    )
    .then((res: AxiosResponse) => {
      return res.data;
    })
    .catch((e: AxiosError) => {
      if (e.response?.status === 400 || e.response?.status === 401) {
        return {
          ok: false,
          error: "로그인 에러",
        };
      }
    });
};
