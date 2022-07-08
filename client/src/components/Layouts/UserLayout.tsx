import React from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { useFetchMe } from "../../hooks/useFetchMe";
import { BsFillPencilFill } from "react-icons/bs";
import Footer from "./Common/Footer";
import { useFetchUser } from "../../hooks/useFetchUser";
import ProfileHeader from "../Features/User/ProfileHeader";

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
  const { user_id } = useParams();
  const { user, loading } = useFetchUser(user_id ? parseInt(user_id) : 0);
  const { user: me } = useFetchMe();

  if (loading || !user) {
    return <div>Loading...</div>;
  }
  return (
    <div className="">
      {/* Profile Header */}
      <ProfileHeader user={user} me={me} />
      {/* User Navigation */}
      <div className="px-8 pt-4">
        <div className="flex justify-between items-start border-b border-base-200">
          <div className="flex tabs">
            <NavLinkItem text="All" to="." />
            <NavLinkItem text="Popular tracks" to="./popular-tracks" />
            <NavLinkItem text="Tracks" to="./tracks" />
            <NavLinkItem text="Playlists" to="./sets" />
            <NavLinkItem text="Reposts" to="./reposts" />
          </div>
          {me?.id === user.id && (
            <button className="btn gap-2 btn-xs normal-case">
              <BsFillPencilFill />
              Edit
            </button>
          )}
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
