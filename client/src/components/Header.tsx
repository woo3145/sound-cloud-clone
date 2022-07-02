import React from "react";
import { NavLink } from "react-router-dom";
import { useFetchMe } from "../hooks/useFetchMe";
import { MoreDropdown } from "./Dropdown/MoreDropdown";
import { UserDropDown } from "./Dropdown/UserDropdown";

const DrawerToggle = () => {
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
const NavMenu = () => {
  return (
    <div className="hidden lg:block mr-8">
      <ul className="menu menu-horizontal">
        <li>
          <NavLink to="/discover" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/stream" end>
            Stream
          </NavLink>
        </li>
        <li>
          <NavLink to="/you/libary" end>
            Library
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export const Header = () => {
  const { isLoggedIn } = useFetchMe();
  return (
    <header
      className="sticky top-0 z-30 flex h-16 w-full justify-center backdrop-blur transition-all duration-100 
    bg-neutral text-neutral-content shadow-sm
  "
    >
      <div className="w-full navbar bg-inherit  max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto">
        {/* Nav Left */}
        <div className="flex-1 navbar-start">
          <DrawerToggle />
          <NavLink
            to="discover"
            className="btn btn-ghost text-xl normal-case px-2 ml-2 mr-8"
          >
            SoundCloud
          </NavLink>
          <NavMenu />
        </div>
        {/* Nav Right */}
        <div className="flex-0 navbar-end">
          {isLoggedIn && (
            <NavLink
              to="/upload"
              className="btn btn-sm btn-primary mr-2 normal-case"
            >
              Upload
            </NavLink>
          )}
          {isLoggedIn ? (
            <UserDropDown />
          ) : (
            <>
              <NavLink to="/signin" className="btn btn-sm mr-2 normal-case">
                Sign in
              </NavLink>
              <NavLink
                to="signup"
                className="btn btn-sm btn-primary mr-2 normal-case"
              >
                Create Account
              </NavLink>
            </>
          )}
          <MoreDropdown />
        </div>
      </div>
    </header>
  );
};
