import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full border-t border-base-200 py-4">
      <div className="text-xs text-base-content flex flex-wrap">
        <NavLink to="/" className="opacity-50 hover:opacity-100 duration-200">
          Legal
        </NavLink>
        <span className="px-1">∙</span>
        <NavLink to="/" className="opacity-50 hover:opacity-100 duration-200">
          Privacy
        </NavLink>
        <span className="px-1">∙</span>
        <NavLink to="/" className="opacity-50 hover:opacity-100 duration-200">
          Cookie Policy
        </NavLink>
        <span className="px-1">∙</span>
        <NavLink to="/" className="opacity-50 hover:opacity-100 duration-200">
          Consent Manager
        </NavLink>
        <span className="px-1">∙</span>
        <NavLink to="/" className="opacity-50 hover:opacity-100 duration-200">
          Imprint
        </NavLink>
        <span className="px-1">∙</span>
        <NavLink to="/" className="opacity-50 hover:opacity-100 duration-200">
          Creator Resources
        </NavLink>
        <span className="px-1">∙</span>
        <NavLink to="/" className="opacity-50 hover:opacity-100 duration-200">
          Blog
        </NavLink>
        <span className="px-1">∙</span>
        <NavLink to="/" className="opacity-50 hover:opacity-100 duration-200">
          Charts
        </NavLink>
        <span className="px-1">∙</span>
      </div>
      <div className="pt-2 cursor-pointer group text-xs">
        <span className="text-blue-600 mr-1 group-hover:text-neutral-700">
          Language:
        </span>
        <span className="text-base-content">English (US)</span>
      </div>
    </footer>
  );
};

export default Footer;
