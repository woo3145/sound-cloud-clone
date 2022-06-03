import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Discover from "../pages/Discover";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import { useAppSelector } from "../redux/store";
import Layout from "./Layouts/Layout";

const Router = () => {
  const isLoggedIn = !!useAppSelector((state) => state.user.id);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Discover />} />
          <Route path="discover" element={<Discover />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />

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
