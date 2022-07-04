import React from "react";
import { Link } from "react-router-dom";

const HeaderMoreDropdownIcon = () => {
  return (
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
  );
};

interface Props {
  onLogout: () => Promise<void>;
  isLoggedIn: boolean;
}

export const HeaderMoreDropdown = ({ onLogout, isLoggedIn }: Props) => {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-square btn-ghost rounded-btn">
        <HeaderMoreDropdownIcon />
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
