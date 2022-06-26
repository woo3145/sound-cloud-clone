import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Track, useMockTracks } from "../../mockData/useMockTracks";
import { BiTimeFive } from "react-icons/bi";
import { FiMoreVertical } from "react-icons/fi";
import {
  MdOutlinePlaylistAdd,
  MdPause,
  MdPlayArrow,
  MdShare,
} from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setCollection } from "../../redux/reducers/musicPlayerSlice";

interface Props {
  collection: Track[];
  track: Track;
  idx: number;
}

const TrackCard = ({ track, idx, collection }: Props) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.musicPlayer);

  const setCollectionAndPlay = () => {
    dispatch(setCollection({ collection, idx: idx }));
  };
  return (
    <li className="pb-4">
      <div className="flex items-center">
        {/* Artwork Image*/}
        <div className="shrink-0 flex">
          <div className="avatar">
            <div className="w-20 rounded">
              <img
                src={
                  track.artworkUrl
                    ? track.artworkUrl
                    : "https://api.lorem.space/image/face?hash=92048"
                }
                alt="Artwork"
              />
            </div>
          </div>
        </div>
        {/* content */}
        <div className="px-4 w-full">
          <p className="text-md text-base-content break-all">{track.title}</p>
          <div className="flex items-center">
            <button className="btn btn-ghost btn-xs font-normal opacity-50 px-0 pr-4 normal-case justify-start shrink-0 text-base-content break-all hover:bg-base-100">
              {track.user.username}
            </button>
            <p className="text-xs text-base-content opacity-50">20 days ago</p>
          </div>
        </div>
        <div className="shrink-0 flex items-center">
          <label
            className={`swap ${
              idx === state.currentTrackIdx &&
              state.isPlaying === true &&
              "swap-active"
            }`}
            onClick={setCollectionAndPlay}
          >
            <div className="btn btn-sm swap-on bg-primary border-none">
              <MdPause className="mr-2" />
              Pause
            </div>
            <div className="btn btn-sm swap-off">
              <MdPlayArrow className="mr-2" />
              Play
            </div>
          </label>

          <p className="btn btn-ghost btn-sm normal-case shrink-0 text-base-content break-all w-20 hover:bg-base-100">
            <BiTimeFive className="mr-2" />
            {"3:42"}
          </p>

          <label className="swap px-4">
            <input type="checkbox" />
            <AiFillHeart className="swap-on text-primary" />
            <AiOutlineHeart className="swap-off" />
          </label>

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
                <a href="#1" className="text-sm">
                  <MdShare />
                  Repost
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </li>
  );
};

export default TrackCard;
