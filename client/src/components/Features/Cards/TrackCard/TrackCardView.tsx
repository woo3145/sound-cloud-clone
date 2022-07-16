import React from "react";
import { AiFillHeart, AiOutlineHeart, AiTwotoneDelete } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { FiMoreVertical } from "react-icons/fi";
import {
  MdOutlinePlaylistAdd,
  MdPause,
  MdPlayArrow,
  MdShare,
} from "react-icons/md";
import { dateFormat, timeFormat } from "../../../../utils/format";

const TrackCardArtwork = ({
  artworkUrl,
}: {
  artworkUrl: string | undefined;
}) => {
  return (
    <div className="shrink-0 flex">
      <div className="avatar">
        <div className="w-20 rounded">
          <img
            crossOrigin="anonymous"
            src={
              artworkUrl
                ? artworkUrl
                : "https://api.lorem.space/image/face?hash=92048"
            }
            alt="Artwork"
          />
        </div>
      </div>
    </div>
  );
};

const TrackCardTitleContainer = ({
  title,
  username,
  createdAt,
}: {
  title: string;
  username: string;
  createdAt: Date;
}) => {
  return (
    <div className="px-4 w-full">
      <p className="text-md text-base-content break-all">{title}</p>
      <div className="flex items-center">
        <button className="btn btn-ghost btn-xs font-normal opacity-50 px-0 pr-4 normal-case justify-start shrink-0 text-base-content break-all hover:bg-base-100">
          {username}
        </button>
        <p className="text-xs text-base-content opacity-50">
          {dateFormat(createdAt)}
        </p>
      </div>
    </div>
  );
};

const PlayButton = ({
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <label className={`swap ${isActive && "swap-active"}`} onClick={onClick}>
      <div className="btn btn-sm swap-on bg-primary border-none">
        <MdPause className="mr-2" />
        Pause
      </div>
      <div className="btn btn-sm swap-off">
        <MdPlayArrow className="mr-2" />
        Play
      </div>
    </label>
  );
};
const TrackDuration = ({ duration }: { duration: number }) => {
  return (
    <p className="btn btn-ghost btn-sm normal-case shrink-0 text-base-content break-all w-20 hover:bg-base-100">
      <BiTimeFive className="mr-2" />
      {timeFormat(duration)}
    </p>
  );
};

const LikeButton = () => {
  return (
    <label className="swap px-4">
      <input type="checkbox" />
      <AiFillHeart className="swap-on text-primary" />
      <AiOutlineHeart className="swap-off" />
    </label>
  );
};

const MoreDropdown = ({
  deleteTrack,
  isMyTrack,
}: {
  deleteTrack: () => void;
  isMyTrack: boolean;
}) => {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost">
        <FiMoreVertical />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a href="#1" className="text-sm">
            <MdOutlinePlaylistAdd />
            Add to Playlist
          </a>
        </li>
        <li>
          <a href="#2" className="text-sm">
            <MdShare />
            Repost
          </a>
        </li>
        {isMyTrack && (
          <li>
            <a onClick={deleteTrack} href="." className="text-sm">
              <AiTwotoneDelete />
              delete
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

interface TrackCardViewProps {
  track: ITrack;
  isActive: boolean;
  isMyTrack: boolean;
  setCollectionAndPlayToggle: () => void;
  deleteTrack: () => void;
}

const TrackCardView = ({
  track,
  isActive,
  isMyTrack,

  setCollectionAndPlayToggle,
  deleteTrack,
}: TrackCardViewProps) => {
  return (
    <li className="pb-4 flex items-center">
      {/* Artwork Image*/}
      <TrackCardArtwork artworkUrl={track.artworkUrl} />
      {/* content */}
      <TrackCardTitleContainer
        title={track.title}
        username={track.user.username}
        createdAt={track.createdAt}
      />
      <div className="shrink-0 flex items-center">
        <PlayButton isActive={isActive} onClick={setCollectionAndPlayToggle} />
        <TrackDuration duration={track.duration} />
        <LikeButton />
        <MoreDropdown deleteTrack={deleteTrack} isMyTrack={isMyTrack} />
      </div>
    </li>
  );
};

export default TrackCardView;
