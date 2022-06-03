import axios, { AxiosError, AxiosResponse } from "axios";

interface SignInParam {
  email: string;
  password: string;
}

export const signInApi = async ({ email, password }: SignInParam) => {
  return await axios
    .post("http://localhost:4000/auth/signin", {
      email,
      password,
    })
    .then((res: AxiosResponse) => {
      return {
        ok: true,
        ...res.data,
      };
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

interface SignUpParam {
  email: string;
  password: string;
  name: string;
}

export const signUpApi = async ({ email, password, name }: SignUpParam) => {
  return await axios
    .post("http://localhost:4000/user/signup", {
      email,
      password,
      name,
    })
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
