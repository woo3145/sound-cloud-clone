import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import ErrorText from "../Text/ErrorText";
import customAxios from "../../utils/customAxios";

interface FormData {
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
  } = useForm<FormData>();

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
    <div className="w-full h-auto border p-8">
      <h2 className="text-center text-2xl">
        Create your SoundCloud(clone) account
      </h2>

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

        <form className="flex flex-col text-lg mb-4" onSubmit={onRegister}>
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="user name"
            className="border rounded-sm px-4 py-1.5 focus:outline-none"
          />
          {errors.name?.type === "required" && (
            <ErrorText text={"email is required"} />
          )}
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="email address"
            className="border rounded-sm px-4 py-1.5 focus:outline-none mt-2"
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
          <input
            {...register("checkPassword", {
              required: true,
              minLength: 8,
              maxLength: 32,
            })}
            type="password"
            placeholder="check password"
            className="border rounded-sm px-4 py-1.5 focus:outline-none mt-2"
          />
          {errors.checkPassword?.type === "required" && (
            <ErrorText text={"password is required"} />
          )}
          {errors.checkPassword?.type === "maxLength" ||
            (errors.checkPassword?.type === "minLength" && (
              <ErrorText
                text={"password length should be between 8 to 32 characters"}
              />
            ))}
          <button className="w-full py-1.5 bg-orange-600 mt-4 rounded-sm text-white">
            Sing up
          </button>
          {resError && <ErrorText text={resError} />}
        </form>

        <div className="flex justify-center text-sm">
          <span className="mr-2">Already have an account?</span>
          <Link to="/signin" className="font-bold text-blue-500">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
