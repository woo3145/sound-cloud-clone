import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { allDropdownClose } from "../../redux/reducers/uiSlice";
import { useAppDispatch } from "../../redux/store";
import NavDrawer from "../Drawers/NavDrawer";
import { Header } from "../Header";

const Layout = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  // 페이지 이동 시 드롭다운 닫음처리
  useEffect(() => {
    dispatch(allDropdownClose());
  }, [location, dispatch]);

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
