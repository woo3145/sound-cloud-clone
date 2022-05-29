import React from "react";
import { Link, NavLink } from "react-router-dom";
import { IoEllipsisHorizontalSharp, IoSearch } from "react-icons/io5";

const logoImg =
  "https://a-v2.sndcdn.com/assets/images/peace-cloud-28ad0963.svg";

const Header = () => {
  return (
    <header
      className="w-full h-12 fixed top-0 left-0
    bg-neutral-700 text-gray-300 text-sm"
    >
      <div className="w-full mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg flex items-center justify-between self-stretch">
        {/* left (Logo)*/}
        <div className="flex items-center self-stretch shrink-0">
          <div className="bg-neutral-900">
            <Link
              to="/discover"
              className="block h-12 w-20 px-4 bg-origin-content bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${logoImg})` }}
            />
          </div>
          <nav className="flex self-stretch">
            <ul className="flex self-stretch">
              <li className="w-28 flex self-strtch items-center justify-center border-r border-neutral-900">
                <NavLink
                  to="/discover"
                  className={({ isActive }) =>
                    `flex self-stretch items-center justify-center w-full ${
                      isActive
                        ? "bg-neutral-900 text-white"
                        : "hover:text-white"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="w-28 flex self-strtch items-center justify-center border-r border-neutral-900">
                <NavLink
                  to="/stream"
                  className={({ isActive }) =>
                    `flex self-stretch items-center justify-center w-full ${
                      isActive
                        ? "bg-neutral-900 text-white"
                        : "hover:text-white"
                    }`
                  }
                >
                  Stream
                </NavLink>
              </li>
              <li className="w-28 flex self-strtch items-center justify-center border-r border-neutral-900">
                <NavLink
                  to="/you/library"
                  className={({ isActive }) =>
                    `flex self-stretch items-center justify-center w-full ${
                      isActive
                        ? "bg-neutral-900 text-white"
                        : "hover:text-white"
                    }`
                  }
                >
                  Library
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
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
        {/* right (Login Button)*/}
        <div className="flex items-center justify-between self-stretch shrink-0">
          {/* Not Login */}
          <div className="flex items-center text-white">
            <Link
              to="/signin"
              className="px-3 py-1 ml-2 mr-4 border rounded-md border-gray-400 cursor-pointer hover:border-gray-300"
            >
              Sign in
            </Link>
            <div className="px-3 py-1 rounded-md cursor-pointer bg-orange-600">
              Create account
            </div>
          </div>
          <div className="px-4 cursor-pointer">Upload</div>
          <IoEllipsisHorizontalSharp
            size={28}
            className="hover:text-white cursor-pointer"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
