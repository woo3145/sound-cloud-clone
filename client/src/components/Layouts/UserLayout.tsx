import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useMe } from "../../hooks/useMe";
import { AiFillCamera } from "react-icons/ai";
import GrayButton from "../Button/GrayButton";
import { BsFillPencilFill } from "react-icons/bs";

const NavLinkItem = ({
  text,
  to,
  end = false,
}: {
  text: string;
  to: string;
  end?: boolean;
}) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `mr-6 cursor-pointer pb-1 ${to === "."} ${
          isActive
            ? "border-b-4 border-blue-900"
            : "hover:border-b-4 border-black"
        }`
      }
    >
      {text}
    </NavLink>
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
      <div
        style={{
          backgroundImage: `linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)`,
        }}
        className="h-auto to-red-400 from-yellow-300 bg-gradient-to-tr p-8 flex"
      >
        <div className="relative flex justify-center mr-8">
          <div className="w-48 h-48 rounded-full bg-blue-900 shrink-0"></div>
          <div className="absolute bottom-6">
            <GrayButton
              icon={<AiFillCamera className="inline text-lg mr-1" />}
              text="Upload image"
            />
          </div>
        </div>
        <div className="w-full flex justify-between items-start">
          <div className="text-white text-3xl font-light px-2 py-1 bg-black">
            {user?.username}
          </div>
          <GrayButton
            icon={<AiFillCamera className="inline text-lg mr-1" />}
            text="Upload header image"
          />
        </div>
      </div>
      {/* User Navigation */}
      <div className="px-8 pt-4">
        <div className="flex justify-between items-center border-b">
          <div className="text-lg flex">
            <NavLinkItem text="All" to="." end />
            <NavLinkItem text="Popular tracks" to="./popular-tracks" />
            <NavLinkItem text="Tracks" to="./tracks" />
            <NavLinkItem text="Albums" to="./albums" />
            <NavLinkItem text="Playlists" to="./sets" />
            <NavLinkItem text="Reports" to="./reports" />
          </div>
          <GrayButton
            icon={<BsFillPencilFill size={12} className="mr-1.5" />}
            text={"Edit"}
          />
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default UserLayout;
