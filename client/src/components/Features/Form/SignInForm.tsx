import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import ErrorText from "../../Shared/Text/ErrorText";
import { useLocalStorage } from "../../../utils/useLocalStorage";
import customAxios from "../../../utils/customAxios";

interface FormData {
  email: string;
  password: string;
}

const SignInForm = () => {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

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
      setError("이메일이나 패스워드가 잘못되었습니다.");
    }
  });

  return (
    <div className="w-full h-auto border p-8">
      <h2 className="text-center text-2xl">Welcome back!</h2>
      <div className="flex flex-col py-8">
        {/*SNS Login*/}
        <div className="w-full">
          <div className="w-full py-2 flex justify-center items-center border border-gray-200 rounded-sm cursor-pointer">
            <FcGoogle className="mr-2" />
            Continue with Google
          </div>
        </div>

        <div className="flex items-center justify-between py-4 w-full">
          <hr className="w-full border-neutral-900" />
          <p className="px-4">or</p>
          <hr className="w-full border-neutral-900" />
        </div>

        <form className="flex flex-col text-lg mb-4" onSubmit={onLogin}>
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="email address"
            className="border rounded-sm px-4 py-1.5 focus:outline-none"
          />
          {errors.email?.type === "required" && (
            <ErrorText text={"email is required"} />
          )}
          <input
            {...register("password", {
              required: true,
              minLength: 8,
              maxLength: 32,
            })}
            type="password"
            placeholder="password"
            className="border rounded-sm px-4 py-1.5 focus:outline-none mt-2"
          />
          {errors.password?.type === "required" && (
            <ErrorText text={"password is required"} />
          )}
          {errors.password?.type === "maxLength" ||
            (errors.password?.type === "minLength" && (
              <ErrorText
                text={"password length should be between 8 to 32 characters"}
              />
            ))}
          <button className="w-full py-1.5 bg-orange-600 mt-4 rounded-sm text-white">
            Sing in
          </button>
          {error && <ErrorText text={error} />}
        </form>

        <div className="flex justify-center text-sm">
          <span className="mr-2">No Account?</span>
          <Link to="/signup" className="font-bold text-blue-500">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
