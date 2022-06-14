import React from "react";
import { FaUser, FaHeart } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useMe } from "../../hooks/useMe";
import { userDropdownToggle } from "../../redux/reducers/uiSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

export const UserDropDown = () => {
  const open = useAppSelector((state) => state.ui.userDropdownVisible);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useMe();

  return (
    <div className="relative flex self-stretch text-xs">
      <div
        className={`flex items-center cursor-pointer self-stretch px-2 ${
          open ? "bg-neutral-900 text-white" : "hover:text-white"
        }`}
        onClick={() => dispatch(userDropdownToggle())}
      >
        <div className="w-7 h-7 bg-gray-500 rounded-full shrink-0 mr-2"></div>
        <p className="mr-2">{user.username}</p>
        <IoChevronDown size={12} />
      </div>
      {open && (
        <div className="fixed top-12 w-36 text-neutral-900 bg-white border border-t-0 rounded-b-md border-neutral-300 h-auto">
          <ul className="w-full h-auto font-semibold">
            <li
              onClick={() => navigate(`/${user.id}`)}
              className="py-2 flex items-center cursor-pointer hover:bg-neutral-100"
            >
              <FaUser className="mx-2" />
              <p>Profile</p>
            </li>
            <li className="py-2 flex items-center cursor-pointer hover:bg-neutral-100">
              <FaHeart className="mx-2" />
              <p>Likes</p>
            </li>
            <li className="py-2 flex items-center cursor-pointer hover:bg-neutral-100">
              <FaUser className="mx-2" />
              <p>Tracks</p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
