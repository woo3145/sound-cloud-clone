import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import Discover from "../pages/Discover";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import UserMain from "../pages/User/UserMain";
import Layout from "./Layouts/Layout";
import UserLayout from "./Layouts/UserLayout";

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
          <Route path=":user_id" element={<UserLayout />}>
            <Route index element={<UserMain />} />
            <Route path="popular-tracks" element={<div>Popular Tracks</div>} />
            <Route path="tracks" element={<div>Tracks</div>} />
            <Route path="sets" element={<div>Play Lists</div>} />
            <Route path="reposts" element={<div>Reposts</div>} />
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
