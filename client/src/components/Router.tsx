import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import Discover from "../pages/Discover";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Layout from "./Layouts/Layout";

const Router = () => {
  const { isLoggedIn } = useMe();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Discover />} />
          <Route path="discover" element={<Discover />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />

          <Route path="upload" element={<Discover />} />
          <Route path="stream" element={<Discover />} />
          <Route path="you">
            <Route path="*" element={isLoggedIn ? <Discover /> : <SignIn />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
