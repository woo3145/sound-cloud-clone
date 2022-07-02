import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import SignInForm from "../components/Form/SignInForm";
import { useFetchMe } from "../hooks/useFetchMe";

const SignIn = () => {
  const { isLoggedIn } = useFetchMe();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="w-full flex items-center flex-col px-8">
      <div className="max-w-md w-full py-8">
        <div className="pt-5 pb-10">
          <h2 className="text-2xl text-center font-light leading-8">
            Join SoundCloud(clone) to save your favorite tracks, playlists and
            albums
          </h2>
        </div>
        <SignInForm />
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
