import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Discover from "../pages/Discover";
import Home from "../pages/Home";
import Layout from "./Layouts/Layout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="discover" element={<Discover />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
