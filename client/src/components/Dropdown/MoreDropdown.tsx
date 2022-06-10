import React from "react";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { useMe } from "../../hooks/useMe";
import { moreDropdownToggle } from "../../redux/reducers/uiSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import customAxios from "../../utils/customAxios";

export const MoreDropdown = () => {
  const open = useAppSelector((state) => state.ui.moreDropdownVisible);
  const dispatch = useAppDispatch();
  const { mutate, isLoggedIn } = useMe();
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
    <div className="relative flex self-stretch text-xs">
      <div
        onClick={() => dispatch(moreDropdownToggle())}
        className={`flex items-center justify-center cursor-pointer self-stretch px-2 ${
          open ? "bg-neutral-900 text-white" : "hover:text-white"
        }`}
      >
        <IoEllipsisHorizontalSharp size={24} />
      </div>
      {open && (
        <div className="absolute top-12 right-0 w-44 text-neutral-900 bg-white border border-t-0 rounded-b-md border-neutral-300 h-auto">
          <ul className="w-full h-auto font-semibold">
            <li className="py-2 px-2 flex items-center cursor-pointer hover:bg-neutral-100">
              <p>About us</p>
            </li>
            <li className="py-2 px-2 flex items-center cursor-pointer hover:bg-neutral-100">
              <p>Legal</p>
            </li>
            <li className="py-2 px-2 flex items-center cursor-pointer hover:bg-neutral-100 border-b">
              <p>Copyright</p>
            </li>

            {isLoggedIn && (
              <li className="py-2 px-2 flex items-center cursor-pointer hover:bg-neutral-100">
                <p>Settings</p>
              </li>
            )}
            {isLoggedIn && (
              <li
                onClick={onLogout}
                className="py-2 px-2 flex items-center cursor-pointer hover:bg-neutral-100"
              >
                <p>Sign out</p>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
