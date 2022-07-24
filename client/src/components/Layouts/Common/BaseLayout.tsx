import React from 'react';
import { Outlet } from 'react-router-dom';
import MusicPlayer from '../../Features/MusicPlayer/MusicPlayer';
import NavDrawer from '../../Shared/Drawers/NavDrawer';
import { Header } from './Header/Header';

const BaseLayout = () => {
  return (
    <div className="w-full bg-base-200 min-h-screen drawer">
      <input id="nav-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main */}
      <div className="drawer-content w-full flex flex-col items-center relative">
        <Header />
        <div className="w-full max-w-screen-lg h-auto bg-base-100">
          <Outlet />
        </div>

        <MusicPlayer />
      </div>

      {/* Drawers & Modals */}
      <NavDrawer />
    </div>
  );
};

export default BaseLayout;
