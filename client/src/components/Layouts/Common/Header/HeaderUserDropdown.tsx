import React from 'react';
import { FaUser, FaHeart } from 'react-icons/fa';
import { useFetchMe } from '../../../../hooks/useFetchMe';
import { IoIosArrowDown } from 'react-icons/io';
import { Link } from 'react-router-dom';

const UserDropdownButton = ({
  tabIndex,
  avatarUrl,
  username,
}: {
  tabIndex: number;
  avatarUrl?: string;
  username: string;
}) => {
  return (
    <label
      tabIndex={tabIndex}
      className="btn btn-square btn-ghost rounded-btn w-auto px-4 focus:bg-neutral-focus"
    >
      <div className="flex items-center text-xs gap-3">
        <UserAvatar src={avatarUrl} />
        <p>{username}</p>
        <IoIosArrowDown />
      </div>
    </label>
  );
};

const UserAvatar = ({ src }: { src?: string }) => {
  return (
    <div className="avatar">
      <div className="w-8 rounded-full ring-offset-base-100 ring-offset-1 ring-1 bg-white">
        <img
          crossOrigin="anonymous"
          src={src ? src : 'https://api.lorem.space/image/face?hash=3174'}
          alt="avator"
        />
      </div>
    </div>
  );
};

const ProfileMenu = ({
  userId,
  tabIndex,
}: {
  userId: number;
  tabIndex: number;
}) => {
  return (
    <ul
      tabIndex={tabIndex}
      className="menu dropdown-content p-2 shadow bg-neutral rounded-box w-52 mt-4"
    >
      <ProfileMenuItem href={`/${userId}`} text="Profile" icon={<FaUser />} />
      <ProfileMenuItem href={`/${userId}`} text="Likes" icon={<FaHeart />} />
      <ProfileMenuItem href={`/${userId}`} text="Tracks" icon={<FaUser />} />
    </ul>
  );
};
const ProfileMenuItem = ({
  href,
  text,
  icon,
}: {
  href: string;
  text: string;
  icon: JSX.Element;
}) => {
  return (
    <li>
      <Link to={href} className="hover:bg-neutral-focus">
        <>
          {icon}
          {text}
        </>
      </Link>
    </li>
  );
};

export const HeaderUserDropDown = () => {
  const { user, loading } = useFetchMe();

  if (loading || !user) {
    return <div>Loading ...</div>;
  }
  return (
    <div className="dropdown dropdown-end">
      <UserDropdownButton
        tabIndex={0}
        avatarUrl={user.avatarUrl}
        username={user.username}
      />
      <ProfileMenu tabIndex={0} userId={user.id} />
    </div>
  );
};
