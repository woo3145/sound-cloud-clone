import React from "react";
import { UseFormRegister } from "react-hook-form";
import { TrackUploadFormData } from "./TrackUploadForm";

const ArtWorkPreview = () => {
  return (
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
  );
};

interface Props {
  register: UseFormRegister<TrackUploadFormData>;
  defaultFileName: string;
  onCancel: () => void;
  onSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
}

const TrackUploadFormView = ({
  register,
  defaultFileName,
  onSubmit,
  onCancel,
}: Props) => {
  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex">
        <ArtWorkPreview />
        <div className="w-full pl-4">
          <div className="mb-4">
            <span className="">Title</span>
            <span className="text-primary">*</span>
            <input
              {...register("title", { required: true })}
              type="text"
              placeholder="Name your track"
              className="input input-bordered input-primary w-full mt-2"
              defaultValue={defaultFileName}
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
                defaultChecked
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
      <div className="text-right">
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

export default TrackUploadFormView;
