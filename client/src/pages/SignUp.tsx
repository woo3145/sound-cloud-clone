import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const SignUp = () => {
  return (
    <div className="w-full flex items-center flex-col px-8">
      <div className="max-w-md w-full py-8">
        <div className="pt-5 pb-10">
          <h2 className="text-2xl text-center font-light leading-8">
            Join SoundCloud(clone) to save your favorite tracks, playlists and
            albums
          </h2>
        </div>
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

            <form className="flex flex-col text-lg mb-4">
              <input
                type="text"
                placeholder="user name"
                className="border rounded-sm px-4 py-1.5 focus:outline-none mb-2"
              />
              <input
                type="text"
                placeholder="email address"
                className="border rounded-sm px-4 py-1.5 focus:outline-none mb-2"
              />
              <input
                type="password"
                placeholder="password"
                className="border rounded-sm px-4 py-1.5 focus:outline-none mb-2"
              />
              <input
                type="password"
                placeholder="check password"
                className="border rounded-sm px-4 py-1.5 focus:outline-none"
              />
              <button className="w-full py-1.5 bg-orange-600 mt-4 rounded-sm text-white">
                Sing up
              </button>
            </form>

            <div className="flex justify-center text-sm">
              <span className="mr-2">Already have an account?</span>
              <Link to="/signin" className="font-bold text-blue-500">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
