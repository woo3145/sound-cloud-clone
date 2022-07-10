import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchMe } from "../hooks/useFetchMe";
import { BsFillPencilFill } from "react-icons/bs";
import { useFetchUser } from "../hooks/useFetchUser";
import UserTrackList from "../components/Features/User/UserTrackList";
import ProfileHeader from "../components/Features/User/ProfileHeader";
import ProfileTabs from "../components/Features/User/ProfileTabs";
import UserSideBar from "../components/Features/User/UserSideBar";

const ProfileTabsSection = ({
  children,
}: {
  children: JSXElementAndFalseType[];
}) => {
  return (
    <div className="px-8 pt-4 flex justify-between items-start border-b border-base-200">
      {children}
    </div>
  );
};

const ProfileEditButton = () => {
  // Open Edit Profile Modal
  return (
    <button className="btn gap-2 btn-xs normal-case">
      <BsFillPencilFill />
      Edit
    </button>
  );
};

const MainSection = ({ children }: { children: JSX.Element }) => {
  return <div className="px-8 flex w-full">{children}</div>;
};

const UserSideBarSection = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="hidden md:block w-full max-w-sm border-l border-base-200 pr-6 pl-6">
      {children}
    </div>
  );
};

const UserPage = () => {
  const [isMe, setIsMe] = useState(false);
  const { user_id } = useParams();
  const { user, loading } = useFetchUser(user_id ? parseInt(user_id) : 0);
  const { user: me } = useFetchMe();

  useEffect(() => {
    if (!me || !user) return;
    setIsMe(me.id === user.id);
  }, [me, user]);

  if (loading || !user) {
    return <div>Loading...</div>;
  }
  return (
    <div className="">
      {/* Profile Header */}
      <ProfileHeader user={user} me={me} />
      {/* User Navigation */}
      <ProfileTabsSection>
        <ProfileTabs userId={user_id ? +user_id : 0} />
        {isMe && <ProfileEditButton />}
      </ProfileTabsSection>
      <div className="w-full flex pt-4">
        <MainSection>
          <UserTrackList isMe={isMe} />
        </MainSection>
        <UserSideBarSection>
          <UserSideBar />
        </UserSideBarSection>
      </div>
    </div>
  );
};

export default UserPage;
