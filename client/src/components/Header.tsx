import React from "react";
import { NavLink } from "react-router-dom";
import { useMe } from "../hooks/useMe";

export const Header = () => {
  const { isLoggedIn } = useMe();
  return (
    <header
      className="sticky top-0 z-30 flex h-16 w-full justify-center backdrop-blur transition-all duration-100 
    bg-neutral text-neutral-content shadow-sm
  "
    >
      <div className=" flex flex-col w-full">
        <div className="w-full navbar bg-inherit  max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto">
          <div className="flex-1 navbar-start">
            {/* Drawer Toggle Icon */}
            <div className="lg:hidden">
              <label htmlFor="nav-drawer" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            {/* Logo */}
            <NavLink
              to="discover"
              className="btn btn-ghost text-xl normal-case px-2 ml-2 mr-8"
            >
              SoundCloud
            </NavLink>
            {/* Nav Items (Desktop*/}
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
          </div>

          <div className="flex-0 navbar-end">
            <NavLink to="/signin" className="btn btn-sm mr-2 normal-case">
              Sign in
            </NavLink>
            <NavLink
              to="signup"
              className="btn btn-sm btn-primary mr-2 normal-case"
            >
              Create Account
            </NavLink>
            <div className="dropdown dropdown-end">
              <label className="btn btn-square btn-ghost rounded-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-5 h-5 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                  ></path>
                </svg>
              </label>
              <ul className="menu dropdown-content p-2 shadow bg-neutral rounded-box w-52 mt-4">
                <li>
                  <a href="#1">About us</a>
                </li>
                <li>
                  <a href="#1">Legal</a>
                </li>
                <li>
                  <a href="#1">Copyright</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
