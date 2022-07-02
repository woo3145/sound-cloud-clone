import React from "react";
import { Link } from "react-router-dom";
import { useFetchMe } from "../../hooks/useFetchMe";
import customAxios from "../../utils/customAxios";

export const MoreDropdown = () => {
  const { mutate, isLoggedIn } = useFetchMe();
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
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="btn btn-square btn-ghost rounded-btn focus:bg-neutral-focus"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block w-5 h-5 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
          ></path>
        </svg>
      </label>
      <ul
        tabIndex={0}
        className="menu dropdown-content p-2 shadow bg-neutral rounded-box w-52 mt-4"
      >
        <li>
          <Link to="#1" className="hover:bg-neutral-focus">
            About us
          </Link>
        </li>
        <li>
          <Link to="#1" className="hover:bg-neutral-focus">
            Legal
          </Link>
        </li>
        <li>
          <Link to="#1" className="hover:bg-neutral-focus">
            Copyright
          </Link>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <Link to="#1" className="hover:bg-neutral-focus">
                Setting
              </Link>
            </li>
            <li>
              <Link
                to="#1"
                onClick={onLogout}
                className="hover:bg-neutral-focus"
              >
                Sign out
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
