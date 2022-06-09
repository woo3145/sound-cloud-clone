import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  IoChevronDown,
  IoEllipsisHorizontalSharp,
  IoSearch,
} from "react-icons/io5";
import { HiBell, HiMail } from "react-icons/hi";
import { useMe } from "../hooks/useMe";
import customAxios from "../utils/customAxios";

const logoImg =
  "https://a-v2.sndcdn.com/assets/images/peace-cloud-28ad0963.svg";

const Nav = () => {
  return (
    <nav className="flex items-center self-stretch shrink-0">
      {/* LOGO */}
      <div className="bg-neutral-900">
        <Link
          to="/discover"
          className="block h-12 w-20 px-4 bg-origin-content bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${logoImg})` }}
        />
      </div>
      <NavItem path={"/discover"} text={"Home"} />
      <NavItem path={"/stream"} text={"Stream"} />
      <NavItem path={"/you/library"} text={"Library"} />
    </nav>
  );
};

const NavItem = ({ path, text }: { path: string; text: string }) => {
  return (
    <div className="w-28 flex self-stretch items-center justify-center border-r border-neutral-900">
      <NavLink
        to={path}
        className={({ isActive }) =>
          `flex self-stretch items-center justify-center w-full ${
            isActive ? "bg-neutral-900 text-white" : "hover:text-white"
          }`
        }
      >
        {text}
      </NavLink>
    </div>
  );
};

const LoginMenu = () => {
  return (
    <div className="flex items-center text-white shrink-0 mx-2">
      <Link
        to="/signin"
        className="px-3 py-1 mr-4 border rounded-md border-gray-400 cursor-pointer hover:border-gray-300"
      >
        Sign in
      </Link>
      <Link
        to="/signup"
        className="px-3 py-1 rounded-md cursor-pointer bg-orange-600"
      >
        Create account
      </Link>
    </div>
  );
};

const UserMenu = () => {
  const { user } = useMe();
  return (
    <div className="flex items-center hover:text-white shrink-0 self-stretch">
      <div className="flex items-center cursor-pointer self-stretch hover:text-white px-2">
        <div className="w-7 h-7 bg-gray-500 rounded-full shrink-0 mr-2"></div>
        <p className="mr-2">{user.name}</p>
        <IoChevronDown size={12} />
      </div>
      <div className="flex items-center justify-center text-neutral-300 hover:text-white cursor-pointer self-stretch px-3">
        <HiBell size={20} />
      </div>
      <div className="flex items-center justify-center text-neutral-300 hover:text-white cursor-pointer self-stretch px-3">
        <HiMail size={20} />
      </div>
    </div>
  );
};

export const Header = () => {
  const { isLoggedIn, mutate } = useMe();
  // 임시 로그아웃
  const onLogout = async () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      await customAxios.post("/auth/logout");
      window.localStorage.removeItem("accessToken");
      window.localStorage.removeItem("accessTokenExpire");
      mutate(null);
    }
  };
  return (
    <header
      className="w-full h-12 fixed top-0 left-0
    bg-neutral-700 text-gray-300 text-sm"
    >
      <div className="w-full mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg flex items-center justify-between self-stretch">
        {/* left (Logo)*/}
        <Nav />
        {/* middle (Search Bar)*/}
        <div className="w-full flex items-center self-stretch p-2.5">
          <form className="flex self-stretch items-center w-full relative">
            <input
              type="text"
              placeholder="Search"
              className="flex w-full self-stretch rounded-sm focus:outline-none pl-2 pr-6 text-neutral-700 bg-gray-200"
            />
            <button className="absolute right-2 text-neutral-600">
              <IoSearch size={15} />
            </button>
          </form>
        </div>
        {/* right (Login Menu || User Menu)*/}
        <div className="flex items-center justify-between self-stretch shrink-0">
          {/* Login Menu */}
          {!isLoggedIn && <LoginMenu />}
          <NavLink
            to="/upload"
            className={({ isActive }) =>
              `flex self-stretch items-center justify-center w-full px-3 ${
                isActive ? "bg-neutral-900 text-white" : "hover:text-white"
              }`
            }
          >
            Upload
          </NavLink>
          {/* UserMenu */}
          {isLoggedIn && <UserMenu />}

          <div
            onClick={onLogout}
            className="flex items-center justify-center hover:text-white cursor-pointer self-stretch px-2"
          >
            <IoEllipsisHorizontalSharp size={24} />
          </div>
        </div>
      </div>
    </header>
  );
};
