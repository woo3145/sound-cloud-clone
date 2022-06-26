import React, { ChangeEvent } from "react";

interface Props {
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
}

const UploadChooser = ({ onChangeHandler, isLoading }: Props) => {
  return (
    <div className="flex flex-col items-center py-8">
      <p className="text-xl pb-4">음원파일을 선택해주세요.</p>
      <input
        type="file"
        className="hidden"
        id="fileUpload"
        accept="audio/*"
        onChange={onChangeHandler}
      />
      <label
        htmlFor="fileUpload"
        className={`btn w-40 normal-case ${
          isLoading ? "loading" : "btn-primary"
        }`}
      >
        파일선택
      </label>
    </div>
  );
};

export default UploadChooser;
