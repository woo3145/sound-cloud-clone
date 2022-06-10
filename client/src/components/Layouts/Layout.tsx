import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { allDropdownClose } from "../../redux/reducers/uiSlice";
import { useAppDispatch } from "../../redux/store";
import { Header } from "../Header";

const Layout = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  // 페이지 이동 시 드롭다운 닫음처리
  useEffect(() => {
    dispatch(allDropdownClose());
  }, [location, dispatch]);

  return (
    <div className="w-full bg-neutral-200 min-h-screen">
      <Header />
      <div className="pt-12 mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg bg-white min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
