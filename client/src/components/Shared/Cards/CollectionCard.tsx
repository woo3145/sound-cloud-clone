import React from "react";
import { Link, NavLink } from "react-router-dom";

const CollectionArtWork = ({ coverImg }: { coverImg: string }) => {
  return (
    <div
      className="cursor-pointer relative w-full h-0"
      style={{ paddingTop: "100%" }} // 이미지 사이즈 조절 (ex. 100% - 1:1, 75% - 4:3)
    >
      <div
        style={{ backgroundImage: `url(${coverImg})` }}
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
      ></div>
    </div>
  );
};
const CollectionTitle = ({ title }: { title: string }) => {
  return (
    <NavLink to="/" className="opacity-80 hover:opacity-100 turncate">
      <p className="truncate break-all">{title}</p>
    </NavLink>
  );
};
const CollectionDescription = ({ description }: { description: string }) => {
  return (
    <p className="text-xs text-neutral-400 break-all truncate">{description}</p>
  );
};

interface Props {
  coverImg: string;
  title: string;
  description: string;
}

export const CollectionCard = ({ coverImg, title, description }: Props) => {
  return (
    <div className="w-full pb-5">
      {/* Artwork */}
      <CollectionArtWork coverImg={coverImg} />

      {/* Title & User */}
      <CollectionTitle title={title} />
      <CollectionDescription description={description} />
    </div>
  );
};
