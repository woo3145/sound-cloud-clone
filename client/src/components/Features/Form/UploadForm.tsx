import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useFetchMe } from "../../../hooks/useFetchMe";
import customAxios from "../../../utils/customAxios";

interface Props {
  fileName: string;
  onCancel: () => void;
  upload: () => Promise<string>;
  duration: number;
}

interface FormData {
  title: string;
  genre: string;
  description?: string;
  privacy: string;
}

const UploadForm = ({ fileName, onCancel, upload, duration }: Props) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const nav = useNavigate();
  const { user } = useFetchMe();

  const [error, setError] = useState("");

  const onUpload = handleSubmit(async (data) => {
    try {
      const { title, genre, description, privacy } = data;
      const url = await upload();
      console.log(url, duration);
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
  return (
    <form onSubmit={onUpload} className="w-full">
      <div className="flex">
        <div className="shrink-0">
          <div className="avatar">
            <div className="w-52 rounded">
              <img
                alt="artwork"
                src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
              />
            </div>
          </div>
        </div>
        <div className="w-full pl-4">
          <div className="mb-4">
            <span className="">Title</span>
            <span className="text-primary">*</span>
            <input
              {...register("title", { required: true })}
              type="text"
              placeholder="Name your track"
              className="input input-bordered input-primary w-full mt-2"
              defaultValue={fileName}
            />
          </div>
          <div className="mb-4">
            <p>Genre</p>
            <select
              {...register("genre", { required: true })}
              className="select select-sm select-bordered mt-2"
              defaultValue={"none"}
            >
              <option value={"none"}>None</option>
              <option value={"pop"}>Pop</option>
              <option value={"rock"}>Rock</option>
              <option value={"electronic"}>Electronic</option>
              <option value={"jazz&blues"}>Jazz & Blues</option>
              <option value={"hip-hop"}>Hip-hop & Rap</option>
              <option value={"r&b&soul"}>R&B & Soul</option>
              <option value={"drum&bass"}>Drum & Bass</option>
              <option value={"piano"}>Piano</option>
            </select>
          </div>
          <div className="mb-4">
            <p>Description</p>
            <textarea
              {...register("description")}
              className="textarea textarea-bordered w-full mt-2"
              placeholder="Description your track"
            ></textarea>
          </div>
          <div className="mb-4">
            <p>Privacy</p>
            <div className="flex mt-2">
              <input
                {...register("privacy", { required: true })}
                type="radio"
                value={"public"}
                className="radio radio-primary mr-4"
              />
              <span>Public</span>
            </div>
            <div className="flex mt-2">
              <input
                {...register("privacy", { required: true })}
                type="radio"
                value={"private"}
                className="radio mr-4"
              />
              <span>Private</span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <button className="btn mr-2" onClick={onCancel}>
          취소
        </button>

        <button className="btn btn-primary" type="submit">
          업로드
        </button>
      </div>
    </form>
  );
};

export default UploadForm;
