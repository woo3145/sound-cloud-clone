import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useMe } from "../../hooks/useMe";
import { AiFillCamera } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";
import Footer from "../Footer";

const NavLinkItem = ({ text, to }: { text: string; to: string }) => {
  return (
    <NavLink
      to={to}
      end={true}
      className={({ isActive }) =>
        `tab pb-2 text-lg ${
          isActive
            ? "tab-bordered border-primary text-primary"
            : "hover:tab-bordered"
        }`
      }
    >
      {text}
    </NavLink>
  );
};
const UserSideBar = () => {
  return (
    <div className="w-full pr-6">
      <ul className="flex w-full items-center justify-between bg-base-100 pb-4">
        <div className="btn btn-ghost opacity-50 hover:bg-base-100 hover:opacity-100 flex-col">
          <p className="text-xs normal-case">Followers</p>
          <p className="text-xl">0</p>
        </div>
        <div className="btn btn-ghost opacity-50 hover:bg-base-100 hover:opacity-100 flex-col">
          <p className="text-xs normal-case">Following</p>
          <p className="text-xl">0</p>
        </div>
        <div className="btn btn-ghost opacity-50 hover:bg-base-100 hover:opacity-100 flex-col">
          <p className="text-xs normal-case">Tracks</p>
          <p className="text-xl">0</p>
        </div>
      </ul>
      <Footer />
    </div>
  );
};

const UserLayout = () => {
  const { user } = useMe();
  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div className="">
      {/* Profile Header */}
      <div className="h-auto to-base-100 from-primary bg-gradient-to-br px-8 py-12 flex">
        <div className="relative flex justify-center mr-8">
          <div className="avatar relative">
            <div className="w-48 rounded-full ring ring-base-100">
              <img
                alt="avator"
                src="https://api.lorem.space/image/face?hash=92310"
              />
            </div>
          </div>
          <button className="btn gap-2 absolute bottom-5 btn-xs normal-case">
            <AiFillCamera />
            Upload image
          </button>
        </div>
        <div className="w-full flex justify-between items-start">
          <div className="text-white text-3xl font-light px-2 py-1 bg-neutral">
            {user?.username}
          </div>

          <button className="btn gap-2 btn-sm normal-case">
            <AiFillCamera />
            Upload header image
          </button>
        </div>
      </div>
      {/* User Navigation */}
      <div className="px-8 pt-4">
        <div className="flex justify-between items-start border-b border-base-200">
          <div className="flex tabs">
            <NavLinkItem text="All" to="." />
            <NavLinkItem text="Popular tracks" to="./popular-tracks" />
            <NavLinkItem text="Tracks" to="./tracks" />
            <NavLinkItem text="Albums" to="./albums" />
            <NavLinkItem text="Playlists" to="./sets" />
            <NavLinkItem text="Reports" to="./reports" />
          </div>
          <button className="btn gap-2 btn-xs normal-case">
            <BsFillPencilFill />
            Edit
          </button>
        </div>
      </div>
      <div className="w-full flex pt-4">
        <div className="px-8 flex w-full">
          <Outlet />
        </div>
        <div className="hidden md:block w-full max-w-sm border-l border-base-200 pr-6 pl-6">
          <UserSideBar />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
