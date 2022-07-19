import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Layouts/Common/Footer";
import SignInForm from "../components/Features/Form/SignInForm/SignInForm";
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
      <div className="max-w-md w-full py-20">
        <SignInForm />
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
