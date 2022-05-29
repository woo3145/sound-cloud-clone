import React from "react";
import { Link } from "react-router-dom";

interface Props {
  coverImg: string;
  title: string;
  mixedTitle: string;
}

const MusicCard = ({ coverImg, title, mixedTitle }: Props) => {
  return (
    <div className="mr-8 pb-8 w-32 md:w-36 lg:w-40">
      <div
        style={{ backgroundImage: `url(${coverImg})` }}
        className="w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 bg-cover bg-center"
      ></div>
      <div className="mt-1 text-sm relative">
        <Link to="/" className="opacity-80 hover:opacity-100 turncate">
          <p className="truncate">{title}</p>
        </Link>
        <p className="text-xs text-neutral-400">{mixedTitle}</p>
      </div>
    </div>
  );
};

export default MusicCard;
