import React from "react";
import { NavLink } from "react-router-dom";

const ProfileTabItem = ({ text, to }: { text: string; to: string }) => {
  return (
    <NavLink
      to={to}
      end
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

interface Props {
  userId: number;
}

const ProfileTabs = ({ userId }: Props) => {
  return (
    <div className="flex tabs">
      <ProfileTabItem text="All" to={`/${userId}`} />
      <ProfileTabItem text="Popular tracks" to={`/${userId}/popular-tracks`} />
      <ProfileTabItem text="Tracks" to={`/${userId}/tracks`} />
      <ProfileTabItem text="Playlists" to={`/${userId}/sets`} />
      <ProfileTabItem text="Reposts" to={`/${userId}/reposts`} />
    </div>
  );
};

export default ProfileTabs;
