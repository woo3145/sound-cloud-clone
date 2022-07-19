import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocalStorage } from "../../../../utils/useLocalStorage";
import customAxios from "../../../../utils/customAxios";
import SignInFormView from "./SignInFormView";

export interface SingInFormData {
  email: string;
  password: string;
}

const SignInForm = () => {
  const [resError, setResError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SingInFormData>();

  // eslint-disable-next-line
  const [__, setAccessToken] = useLocalStorage<string>("accessToken", "");
  // eslint-disable-next-line
  const [_, setAccessTokenExpire] = useLocalStorage<number>(
    "accessTokenExpire",
    0
  );

  const onLogin = handleSubmit(async (data) => {
    const { email, password } = data;
    try {
      const res = await customAxios.post("/auth/login", { email, password });
      setAccessToken(res.data.accessToken);
      setAccessTokenExpire(res.data.accessTokenExpire);
      window.location.replace("/");
    } catch (e) {
      setAccessToken("");
      setAccessTokenExpire(0);
      setResError("이메일이나 패스워드가 잘못되었습니다.");
    }
  });

  return (
    <SignInFormView
      register={register}
      errors={errors}
      resError={resError}
      onSubmit={onLogin}
    />
  );
};

export default SignInForm;
