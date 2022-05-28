import React from "react";
import { Link } from "react-router-dom";

function Discover() {
  return (
    <div className="flex">
      <div className="w-full">
        <div className="min-h-screen w-full">Discover</div>
        <div className="min-h-screen w-full"></div>
        <div className="min-h-screen w-full"></div>
      </div>
      <div
        style={{ maxWidth: 330 }}
        className="hidden sm:block w-full shrink-0 min-h-screen pt-6 px-4 border-gray-100 border-l"
      >
        <div className="sticky top-16 w-full h-auto">
          {/* SideBar Footer */}
          <div className="border-t border-gray-100 pt-4 flex flex-wrap gap-0.5 text-xs text-neutral-400">
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
            <div className="pt-2 cursor-pointer group">
              <span className="text-blue-600 mr-1 group-hover:text-neutral-700">
                Language:
              </span>
              <span className="text-neutral-700">한국어 (kr)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Discover;
