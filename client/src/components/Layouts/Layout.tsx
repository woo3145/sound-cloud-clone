import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <header className="w-full h-12 bg-slate-400">Header</header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/discover">Discover</Link>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
