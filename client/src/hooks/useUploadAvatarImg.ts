import { ChangeEvent, useRef, useState } from "react";

const useUploadAvatarImg = () => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [avatarUploadModalVisible, setAvatarUploadModalVisible] =
    useState(false);

  const setAvatarFile = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    setFile(fileList[0]);
    setAvatarPreviewUrl(URL.createObjectURL(new Blob([fileList[0]])));
    setAvatarUploadModalVisible(true);
  };

  const upload = async () => {
    console.log(file, avatarPreviewUrl);
    return;
  };

  return {
    avatarUrl,
    setAvatarUrl,
    upload,
    setAvatarFile,
    avatarPreviewUrl,
    avatarUploadModalVisible,
    setAvatarUploadModalVisible,
  };
};

export default useUploadAvatarImg;
