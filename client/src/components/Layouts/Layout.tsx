import React from "react";
import { Outlet } from "react-router-dom";
import NavDrawer from "../Drawers/NavDrawer";
import { Header } from "../Header";

const Layout = () => {
  return (
    <div className="w-full bg-base-200 min-h-screen drawer">
      <input id="nav-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        <Header />
        <div className=" mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg bg-base-100 min-h-screen">
          <Outlet />
        </div>
      </div>

      {/* Drawers & Modals */}
      <NavDrawer />
    </div>
  );
};

export default Layout;
