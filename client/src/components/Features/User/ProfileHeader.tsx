import React from "react";
import useUploadAvatarImg from "../../../hooks/useUploadAvatarImg";
import AvatarChooser from "./AvatarChooser";
import AvatarSaveModal from "./AvatarSaveModal";

const ProfileHeaderAvator = ({ avatarUrl }: { avatarUrl: string }) => {
  return (
    <div className="avatar relative">
      <div className="w-48 rounded-full ring ring-base-100 bg-white">
        <img
          crossOrigin="anonymous"
          alt="avator"
          src={
            avatarUrl
              ? avatarUrl
              : "https://api.lorem.space/image/face?hash=3174"
          }
        />
      </div>
    </div>
  );
};

const ProfileHeaderUserName = ({ username }: { username: string }) => {
  return (
    <div className="text-white text-3xl font-light px-2 py-1 bg-neutral">
      {username}
    </div>
  );
};

const ProfileHeaderLeft = ({
  children,
}: {
  children: JSXElementAndFalseType | JSXElementAndFalseType[];
}) => {
  return <div className="relative flex justify-center">{children}</div>;
};
const ProfileHeaderRight = ({
  children,
}: {
  children: JSXElementAndFalseType | JSXElementAndFalseType[];
}) => {
  return (
    <div className="w-full flex justify-between relative items-start pl-8">
      {children}
    </div>
  );
};

interface Props {
  user: IUser;
  me: IMe | null;
}

const ProfileHeader = ({ user, me }: Props) => {
  const {
    upload: avatarUpload,
    setAvatarFile,
    avatarUploadModalVisible,
    setAvatarUploadModalVisible,
    avatarPreviewUrl,
  } = useUploadAvatarImg();

  const closeAvatarModal = () => {
    setAvatarUploadModalVisible(false);
  };

  return (
    <div className="h-auto to-base-100 from-primary bg-gradient-to-br px-8 py-12 flex">
      <ProfileHeaderLeft>
        <ProfileHeaderAvator avatarUrl={user.avatarUrl} />
        {me?.id === user.id && <AvatarChooser setAvatarFile={setAvatarFile} />}
      </ProfileHeaderLeft>
      <ProfileHeaderRight>
        <ProfileHeaderUserName username={user.username} />
      </ProfileHeaderRight>

      {avatarUploadModalVisible && (
        <AvatarSaveModal
          closeModal={closeAvatarModal}
          avatarPreviewUrl={avatarPreviewUrl}
          upload={avatarUpload}
        />
      )}
    </div>
  );
};

export default ProfileHeader;
