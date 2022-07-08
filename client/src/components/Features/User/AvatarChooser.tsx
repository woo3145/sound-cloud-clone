import React from "react";
import { AiFillCamera } from "react-icons/ai";

interface Props {
  setAvatarFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AvatarChooser = ({ setAvatarFile }: Props) => {
  return (
    <div className="flex absolute bottom-5">
      <input
        type="file"
        className="hidden"
        id="avatarUpload"
        accept="image/*"
        onChange={setAvatarFile}
      />
      <label htmlFor="avatarUpload" className={"btn gap-2 btn-xs normal-case"}>
        <AiFillCamera />
        Upload image
      </label>
    </div>
  );
};

export default AvatarChooser;
