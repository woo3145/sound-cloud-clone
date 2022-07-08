import React from "react";
import { useFetchMe } from "../../../hooks/useFetchMe";
import ModalPortal from "../../Shared/ModalPortal";

const AvatarSaveModalHeader = ({ text }: { text: string }) => {
  return <h3 className="text-lg font-bold border-b pb-2">{text}</h3>;
};
const AvatarSaveModalPreview = ({ src }: { src: string }) => {
  return (
    <div className="relative w-full h-auto py-12">
      <div className="avatar">
        <div className="w-full rounded-full">
          <img src={src} alt="avatar preview" />
        </div>
      </div>
    </div>
  );
};

interface Props {
  closeModal: () => void;
  avatarPreviewUrl: string;
  upload: () => Promise<void>;
}
const AvatarSaveModal = ({ closeModal, avatarPreviewUrl, upload }: Props) => {
  const { user } = useFetchMe();

  if (!user) {
    return (
      <ModalPortal>
        <div>로그인이 필요합니다.</div>
      </ModalPortal>
    );
  }
  return (
    <div className="modal modal-open">
      <div className="modal-box relative">
        <label
          onClick={closeModal}
          className="btn btn-sm btn-circle absolute right-4 top-4"
        >
          ✕
        </label>
        <AvatarSaveModalHeader text={user.username} />
        <AvatarSaveModalPreview src={avatarPreviewUrl} />
        <div className="flex justify-end">
          <div className="btn btn-sm mr-2" onClick={closeModal}>
            cancel
          </div>
          <div className="btn btn-sm btn-primary" onClick={upload}>
            save
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarSaveModal;
