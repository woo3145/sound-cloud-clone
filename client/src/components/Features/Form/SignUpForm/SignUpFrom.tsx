import React, { useState } from "react";
import { useForm } from "react-hook-form";
import customAxios from "../../../../utils/customAxios";
import SignUpFormView from "./SignUpFormView";

export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  checkPassword: string;
}

const SignUpForm = () => {
  const [resError, setResError] = useState("");
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const onRegister = handleSubmit(async (data) => {
    setResError("");
    const { name, email, password, checkPassword } = data;
    if (password !== checkPassword) {
      setResError("Password not matched");
      setValue("password", "");
      setValue("checkPassword", "");
      return;
    }

    try {
      const res = await customAxios.post("/user/register", {
        email,
        password,
        name,
      });
      if (res.data.ok) {
        window.location.replace("/signin");
      } else {
        setResError(res.data.error);
      }
    } catch (e) {
      setResError("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  });
  return (
    <SignUpFormView
      register={register}
      errors={errors}
      resError={resError}
      onSubmit={onRegister}
    />
  );
};

export default SignUpForm;
