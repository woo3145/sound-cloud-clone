import React from "react";
import { Link } from "react-router-dom";

const MoreIcon = () => {
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
const MoreDropdownButton = ({ tabIndex }: { tabIndex: number }) => {
  return (
    <label tabIndex={tabIndex} className="btn btn-square btn-ghost rounded-btn">
      <MoreIcon />
    </label>
  );
};

const MoreMenuItem = ({
  href,
  text,
  onClick,
}: {
  href: string;
  text: string;
  onClick?: any;
}) => {
  return (
    <li>
      <Link to={href} className="hover:bg-neutral-focus" onClick={onClick}>
        {text}
      </Link>
    </li>
  );
};
const MoreMenu = ({
  tabIndex,
  isLoggedIn,
  onLogout,
}: {
  tabIndex: number;
  isLoggedIn: boolean;
  onLogout: () => Promise<void>;
}) => {
  return (
    <ul
      tabIndex={tabIndex}
      className="menu dropdown-content p-2 shadow bg-neutral rounded-box w-52 mt-4"
    >
      <MoreMenuItem href="#1" text="About us" />
      <MoreMenuItem href="#1" text="Legal" />
      <MoreMenuItem href="#1" text="About us" />
      <MoreMenuItem href="#1" text="Copyright" />
      {isLoggedIn && (
        <>
          <MoreMenuItem href="#1" text="Setting" />
          <MoreMenuItem href="" text="Sign out" onClick={onLogout} />
        </>
      )}
    </ul>
  );
};

interface Props {
  onLogout: () => Promise<void>;
  isLoggedIn: boolean;
}

export const HeaderMoreDropdown = ({ onLogout, isLoggedIn }: Props) => {
  const tabIndex = 0;
  return (
    <div className="dropdown dropdown-end">
      <MoreDropdownButton tabIndex={tabIndex} />
      <MoreMenu
        tabIndex={tabIndex}
        isLoggedIn={isLoggedIn}
        onLogout={onLogout}
      />
    </div>
  );
};
