import { NavLink } from "react-router-dom";

const NavDrawer = () => {
  return (
    <div className="drawer-side">
      <label htmlFor="nav-drawer" className="drawer-overlay"></label>
      <ul className="menu p-4 overflow-y-auto w-80 bg-neutral text-neutral-content">
        <li>
          <NavLink to="/discover">Home</NavLink>
        </li>
        <li>
          <NavLink to="/stream">Stream</NavLink>
        </li>
        <li>
          <NavLink to="/you/library">Library</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavDrawer;
