import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import ErrorText from "../Text/ErrorText";

interface FormData {
  email: string;
  password: string;
}

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    const { email, password } = data;
    console.log(email, password);
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

        <form className="flex flex-col text-lg mb-4" onSubmit={onSubmit}>
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
