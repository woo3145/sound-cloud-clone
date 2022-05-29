import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-100">
      <div className="pt-3 text-xs text-neutral-400 flex flex-wrap">
        <Link to="/" className="hover:text-neutral-500">
          Legal
        </Link>
        ∙
        <Link to="/" className="hover:text-neutral-500">
          Privacy
        </Link>
        ∙
        <Link to="/" className="hover:text-neutral-500">
          Cookie Policy
        </Link>
        ∙
        <Link to="/" className="hover:text-neutral-500">
          Consent Manager
        </Link>
        ∙
        <Link to="/" className="hover:text-neutral-500">
          Imprint
        </Link>
        ∙
        <Link to="/" className="hover:text-neutral-500">
          Creator Resources
        </Link>
        ∙
        <Link to="/" className="hover:text-neutral-500">
          Blog
        </Link>
        ∙
        <Link to="/" className="hover:text-neutral-500">
          Charts
        </Link>
        ∙
      </div>
      <div className="pt-2 cursor-pointer group text-xs">
        <span className="text-blue-600 mr-1 group-hover:text-neutral-700">
          Language:
        </span>
        <span className="text-neutral-700">English (US)</span>
      </div>
    </footer>
  );
};

export default Footer;
