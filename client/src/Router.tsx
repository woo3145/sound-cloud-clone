import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useFetchMe } from "./hooks/useFetchMe";
import Discover from "./pages/Discover";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import BaseLayout from "./components/Layouts/Common/BaseLayout";
import UserPage from "./pages/UserPage";
import Upload from "./pages/UploadPage";

const Router = () => {
  const { isLoggedIn } = useFetchMe();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Discover />} />
          <Route path="discover" element={<Discover />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="upload" element={<Upload />} />

          <Route path="stream" element={<Discover />} />
          <Route path=":user_id">
            <Route index element={<UserPage />} />
            <Route path=":filter" element={<UserPage />} />
          </Route>
          <Route path="you">
            <Route path="*" element={isLoggedIn ? <Discover /> : <SignIn />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
