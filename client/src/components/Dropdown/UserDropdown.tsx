import React from "react";
import { FaUser, FaHeart } from "react-icons/fa";
import { useFetchMe } from "../../hooks/useFetchMe";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

export const UserDropDown = () => {
  const { user, loading } = useFetchMe();

  if (loading || !user) {
    return <div>Loading ...</div>;
  }
  return (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="btn btn-square btn-ghost rounded-btn w-auto px-4 focus:bg-neutral-focus"
      >
        <div className="flex items-center text-xs">
          <div className="avatar pr-4">
            <div className="w-8 rounded-full ring-offset-base-100 ring-offset-1 ring-1">
              <img
                src={
                  user.avatarUrl
                    ? user.avatarUrl
                    : "https://api.lorem.space/image/face?hash=3174"
                }
                alt="avator"
              />
            </div>
          </div>
          <p className="pr-2">{user.username}</p>
          <IoIosArrowDown />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="menu dropdown-content p-2 shadow bg-neutral rounded-box w-52 mt-4"
      >
        <li>
          <Link to={`/${user.id}`} className="hover:bg-neutral-focus">
            <FaUser className="mx-2" />
            Profile
          </Link>
        </li>
        <li>
          <Link to="#1" className="hover:bg-neutral-focus">
            <FaHeart className="mx-2" />
            Likes
          </Link>
        </li>
        <li>
          <Link to="#1" className="hover:bg-neutral-focus">
            <FaUser className="mx-2" />
            Tracks
          </Link>
        </li>
      </ul>
    </div>
  );
};
