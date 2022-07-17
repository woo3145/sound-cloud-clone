import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useFetchMe } from "../../../../hooks/useFetchMe";
import customAxios from "../../../../utils/customAxios";
import TrackUploadFormView from "./TrackUploadFormView";

interface Props {
  fileName: string;
  onCancel: () => void;
  upload: () => Promise<string>;
  duration: number;
}

export interface TrackUploadFormData {
  title: string;
  genre: string;
  description?: string;
  privacy: string;
}

const TrackUploadForm = ({ fileName, onCancel, upload, duration }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TrackUploadFormData>();
  const nav = useNavigate();
  const { user } = useFetchMe();

  const [error, setError] = useState("");

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { title, genre, description, privacy } = data;
      const url = await upload();
      const res = await customAxios.post("/track", {
        title,
        description,
        genre,
        isPublic: privacy === "public",
        audioUrl: url,
        duration: Math.floor(duration),
        artworkUrl:
          "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      });

      if (res.data.ok) {
        nav(`/${user?.id}`);
      } else {
        throw new Error("Error");
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
  };
  return <TrackUploadFormView {...TrackUploadFormViewProps} />;
};

export default TrackUploadForm;
