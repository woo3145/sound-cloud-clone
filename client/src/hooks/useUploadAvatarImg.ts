import { ChangeEvent, useCallback, useEffect, useState } from "react";
import customAxios from "../utils/customAxios";
import { extractExtension } from "../utils/extract";
import { useFetchMe } from "./useFetchMe";

const useUploadAvatarImg = () => {
  const { user } = useFetchMe();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [avatarUploadModalVisible, setAvatarUploadModalVisible] =
    useState(false);

  const setAvatarFile = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    const reader = new FileReader();
    setFile(fileList[0]);
    reader.onloadend = () => {
      setAvatarPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(fileList[0]);
    setAvatarUploadModalVisible(true);
  };

  const upload = async () => {
    try {
      if (!file) {
        throw new Error("업로드할 파일이 존재하지 않습니다.");
      }

      const formData = new FormData();
      const fileExtention = extractExtension(file.name);
      const nFile = new File([file], `${user?.username}${fileExtention}`, {
        type: `image/${fileExtention}`,
      });
      formData.append("file", nFile);

      const res = await customAxios.post("/uploads/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.ok) {
        return setAvatarUrl(res.data.url);
      } else {
        throw new Error(res.data.error);
      }
    } catch (e: any) {
      throw new Error(e.message);
    }
  };
  const saveUser = useCallback(async () => {
    const res = await customAxios.patch("/user", {
      avatarUrl,
    });
    if (res.data.ok) {
      setAvatarUploadModalVisible(false);

      window.location.reload();
    }
  }, [avatarUrl]);

  useEffect(() => {
    if (!avatarUrl) return;
    try {
      saveUser();
    } catch (e: any) {
      throw new Error(e.message);
    }
  }, [avatarUrl, saveUser]);

  return {
    upload,
    setAvatarFile,
    avatarPreviewUrl,
    avatarUploadModalVisible,
    setAvatarUploadModalVisible,
  };
};

export default useUploadAvatarImg;
