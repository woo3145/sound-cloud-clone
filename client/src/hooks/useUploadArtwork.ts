import { ChangeEvent, useState } from 'react';
import customAxios from '../utils/customAxios';
import { extractExtension } from '../utils/extract';
import { useFetchMe } from './useFetchMe';

const defaultArtworkUrl =
  'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60';

const useUploadArtwork = () => {
  const { user } = useFetchMe();
  const [artworkPreviewUrl, setArtworkPreviewUrl] = useState(defaultArtworkUrl);
  const [file, setFile] = useState<File | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    setFile(fileList[0]);

    const reader = new FileReader();
    reader.onloadend = () => {
      setArtworkPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(fileList[0]);
  };

  const upload = async () => {
    try {
      if (!file) {
        throw new Error('업로드할 파일이 존재하지 않습니다.');
      }

      const formData = new FormData();
      const fileExtention = extractExtension(file.name);
      const nFile = new File(
        [file],
        `${user?.username}-artwork${fileExtention}`,
        {
          type: `image/${fileExtention}`,
        }
      );
      formData.append('file', nFile);

      const res = await customAxios.post('/uploads/artwork', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.data.ok) {
        return res.data.url;
      } else {
        throw new Error(res.data.error);
      }
    } catch (e: any) {
      throw new Error(e.message);
    }
  };

  return {
    upload,
    onChangeHandler,
    artworkPreviewUrl,
  };
};

export default useUploadArtwork;
