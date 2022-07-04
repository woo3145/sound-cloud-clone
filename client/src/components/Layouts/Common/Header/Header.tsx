import React from "react";
import { NavLink } from "react-router-dom";
import { useFetchMe } from "../../../../hooks/useFetchMe";
import NavButton from "../../../Shared/Button/NavButton";
import { HeaderMoreDropdown } from "./HeaderMoreDropdown";
import { HeaderUserDropDown } from "./HeaderUserDropdown";
import customAxios from "../../../../utils/customAxios";

const NavDrawerToggle = () => {
  return (
    <div className="lg:hidden">
      <label htmlFor="nav-drawer" className="btn btn-square btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block w-6 h-6 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </label>
    </div>
  );
};
const SiteLogo = () => {
  return (
    <NavButton
      text="SoundCloud"
      href="/discover"
      color="ghost"
      className="px-4 lg:px-8 text-xl"
    />
  );
};
const NavigationItem = ({ text, href }: { text: string; href: string }) => {
  return (
    <li>
      <NavLink to={href} end>
        {text}
      </NavLink>
    </li>
  );
};
const Navigation = () => {
  return (
    <ul className="menu menu-horizontal hidden lg:flex mr-8">
      <NavigationItem text="Home" href="/discover" />
      <NavigationItem text="Stream" href="/stream" />
      <NavigationItem text="Library" href="/you/libary" />
    </ul>
  );
};

const HeaderLeft = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  return <div className="flex-1 navbar-start">{children}</div>;
};
const HeaderRight = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  return <div className="flex-0 navbar-end">{children}</div>;
};

export const Header = () => {
  const { isLoggedIn, mutate } = useFetchMe();
  // 로그아웃
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
      className="sticky top-0 z-30 flex h-16 w-full justify-center backdrop-blur transition-all duration-100 
    bg-neutral text-neutral-content shadow-sm
  "
    >
      <div className="w-full navbar bg-inherit max-w-screen-lg">
        <HeaderLeft>
          <NavDrawerToggle />
          <SiteLogo />
          <Navigation />
        </HeaderLeft>

        <HeaderRight>
          {isLoggedIn ? (
            <>
              <NavButton
                text="Upload"
                href="/upload"
                color="primary"
                size="sm"
              />
              <HeaderUserDropDown />
            </>
          ) : (
            <>
              <NavButton
                text="Sign in"
                href="/signin"
                size="sm"
                className="mr-2"
              />
              <NavButton
                text="Create Account"
                href="/signup"
                size="sm"
                color="primary"
                className="mr-2"
              />
            </>
          )}
          <HeaderMoreDropdown onLogout={onLogout} isLoggedIn={isLoggedIn} />
        </HeaderRight>
      </div>
    </header>
  );
};
