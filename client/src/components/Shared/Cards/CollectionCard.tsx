import React from "react";
import { Link } from "react-router-dom";

interface Props {
  coverImg: string;
  title: string;
  mixedTitle: string;
}

export const CollectionCard = ({ coverImg, title, mixedTitle }: Props) => {
  return (
    <div className="w-full pb-5">
      {/* Artwork */}
      <div
        className="cursor-pointer relative w-full h-0"
        style={{ paddingTop: "100%" }} // 이미지 사이즈 조절 (ex. 100% - 1:1, 75% - 4:3)
      >
        <div
          style={{ backgroundImage: `url(${coverImg})` }}
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        ></div>
      </div>

      {/* Title & User */}
      <div className="text-sm">
        <Link to="/" className="opacity-80 hover:opacity-100 turncate">
          <p className="truncate break-all">{title}</p>
        </Link>
        <p className="text-xs text-neutral-400 break-all truncate">
          {mixedTitle}
        </p>
      </div>
    </div>
  );
};
