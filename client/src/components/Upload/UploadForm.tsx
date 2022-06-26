import React from "react";

interface Props {
  fileName: string;
  onCancel: () => void;
}

const UploadForm = ({ fileName, onCancel }: Props) => {
  return (
    <div className="w-full">
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
              type="text"
              placeholder="Name your track"
              className="input input-bordered input-primary w-full mt-2"
              defaultValue={fileName}
            />
          </div>
          <div className="mb-4">
            <p>Genre</p>
            <select className="select select-sm select-bordered mt-2">
              <option selected>None</option>
              <option>Pop</option>
              <option>Rock</option>
              <option>Electronic</option>
              <option>Jazz & Blues</option>
              <option>Hip-hop & Rap</option>
              <option>R&B & Soul</option>
              <option>Drum & Bass</option>
              <option>Piano</option>
            </select>
          </div>
          <div className="mb-4">
            <p>Description</p>
            <textarea
              className="textarea textarea-bordered w-full mt-2"
              placeholder="Description your track"
            ></textarea>
          </div>
          <div className="mb-4">
            <p>Privacy</p>
            <div className="flex mt-2">
              <input
                type="radio"
                name="radio-1"
                className="radio radio-primary mr-4"
                checked
              />
              <span>Public</span>
            </div>
            <div className="flex mt-2">
              <input type="radio" name="radio-1" className="radio mr-4" />
              <span>Private</span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <div className="btn mr-2" onClick={onCancel}>
          취소
        </div>

        <div className="btn btn-primary">업로드</div>
      </div>
    </div>
  );
};

export default UploadForm;
