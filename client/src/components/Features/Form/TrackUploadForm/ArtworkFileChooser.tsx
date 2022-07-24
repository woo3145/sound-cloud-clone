import React, { ChangeEvent } from 'react';

interface Props {
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ArtworkFileChooser = ({ onChangeHandler }: Props) => {
  return (
    <div className="py-2 text-center">
      <input
        type="file"
        className="hidden"
        id="artworkFile"
        accept="image/*"
        onChange={onChangeHandler}
      />
      <label
        htmlFor="artworkFile"
        className={`btn btn-sm w-40 normal-case btn-primary`}
      >
        파일선택
      </label>
    </div>
  );
};

export default ArtworkFileChooser;
