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
          <Route index element={<Discover />} />
          <Route path="discover" element={<Discover />} />
          <Route path="stream" element={<Discover />} />
          <Route path="you" element={<Discover />}>
            <Route path="*" element={<Discover />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
