import React from "react";
import { AiFillCamera } from "react-icons/ai";
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

const UploadHeaderImgButton = ({ onClick }: { onClick: any }) => {
  return (
    <button className="btn gap-2 btn-sm normal-case">
      <AiFillCamera />
      Upload header image
    </button>
  );
};
const ProfileHeaderUserName = ({ username }: { username: string }) => {
  return (
    <div className="text-white text-3xl font-light px-2 py-1 bg-neutral">
      {username}
    </div>
  );
};

type JSXElementTypeAndFalse = JSX.Element | false;
const ProfileHeaderLeft = ({
  children,
}: {
  children: JSXElementTypeAndFalse | JSXElementTypeAndFalse[];
}) => {
  return <div className="relative flex justify-center">{children}</div>;
};
const ProfileHeaderRight = ({
  children,
}: {
  children: JSXElementTypeAndFalse | JSXElementTypeAndFalse[];
}) => {
  return (
    <div className="w-full flex justify-between items-start pl-8">
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
    upload,
    setAvatarFile,
    avatarUploadModalVisible,
    setAvatarUploadModalVisible,
    avatarPreviewUrl,
  } = useUploadAvatarImg();

  const closeModal = () => {
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
        {me?.id === user.id && <UploadHeaderImgButton onClick={() => {}} />}
      </ProfileHeaderRight>
      {avatarUploadModalVisible && (
        <AvatarSaveModal
          closeModal={closeModal}
          avatarPreviewUrl={avatarPreviewUrl}
          upload={upload}
        />
      )}
    </div>
  );
};

export default ProfileHeader;
