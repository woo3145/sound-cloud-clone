import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";

const Layout = () => {
  return (
    <div className="w-full">
      <Header />
      <div className="pt-12 mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg bg-red-50">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
