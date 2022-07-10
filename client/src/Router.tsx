import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useFetchMe } from "./hooks/useFetchMe";
import Discover from "./pages/Discover";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import BaseLayout from "./components/Layouts/Common/BaseLayout";
import UserPage from "./pages/UserPage";
import Upload from "./pages/Upload";

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
