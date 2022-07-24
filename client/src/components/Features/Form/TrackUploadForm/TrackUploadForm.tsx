import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useFetchMe } from '../../../../hooks/useFetchMe';
import useUploadArtwork from '../../../../hooks/useUploadArtwork';
import customAxios from '../../../../utils/customAxios';
import TrackUploadFormView from './TrackUploadFormView';

interface Props {
  fileName: string;
  onCancel: () => void;
  uploadTrack: () => Promise<string>;
  duration: number;
}

export interface TrackUploadFormData {
  title: string;
  genre: string;
  description?: string;
  privacy: string;
}

const TrackUploadForm = ({
  fileName,
  onCancel,
  uploadTrack,
  duration,
}: Props) => {
  const { register, handleSubmit } = useForm<TrackUploadFormData>();
  const {
    artworkPreviewUrl,
    onChangeHandler: onArtworkChangeHandler,
    upload: uploadArtwork,
  } = useUploadArtwork();
  const nav = useNavigate();
  const { user } = useFetchMe();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { title, genre, description, privacy } = data;
      const audioUrl = await uploadTrack();
      const artworkUrl = await uploadArtwork();
      const res = await customAxios.post('/track', {
        title,
        description,
        genre,
        audioUrl,
        artworkUrl,
        isPublic: privacy === 'public',
        duration: Math.floor(duration),
      });

      if (res.data.ok) {
        nav(`/${user?.id}`);
      } else {
        throw new Error('Error');
      }
    } catch (e: any) {
      console.log(e.message);
    }
  });

  const TrackUploadFormViewProps = {
    register,
    defaultFileName: fileName,
    onSubmit,
    onCancel,
    artworkPreviewUrl,
    onArtworkChangeHandler,
  };
  return <TrackUploadFormView {...TrackUploadFormViewProps} />;
};

export default TrackUploadForm;
