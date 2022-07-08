import React from "react";
import { AiFillCamera } from "react-icons/ai";
import useUploadAvatarImg from "../../../hooks/useUploadAvatarImg";
import ModalPortal from "../../Shared/ModalPortal";
import AvatarChooser from "./AvatarChooser";

const ProfileHeaderAvator = ({ avatarUrl }: { avatarUrl: string }) => {
  return (
    <div className="avatar relative">
      <div className="w-48 rounded-full ring ring-base-100">
        <img
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
const UploadAvatarImgButton = ({ onClick }: { onClick: any }) => {
  return (
    <button className="btn gap-2 absolute bottom-5 btn-xs normal-case">
      <AiFillCamera />
      Upload image
    </button>
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

const TestModal = () => {
  const { avatarPreviewUrl, setAvatarUploadModalVisible } =
    useUploadAvatarImg();
  const closeModal = () => {
    setAvatarUploadModalVisible(false);
  };
  return (
    <ModalPortal>
      <div className="modal modal-open">
        <div className="modal-box relative">
          <label
            onClick={closeModal}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">
            Congratulations random Internet user!
          </h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
        </div>
      </div>
    </ModalPortal>
  );
};

const ProfileHeader = ({ user, me }: Props) => {
  const { upload, setAvatarFile, avatarUploadModalVisible } =
    useUploadAvatarImg();

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
      {avatarUploadModalVisible && <TestModal />}
    </div>
  );
};

export default ProfileHeader;
