import React from 'react';
import { MdPause, MdPlayArrow } from 'react-icons/md';
import {
  changeTrackIdx,
  playListClear,
  playListVisibleToggle,
  playToggle,
} from '../../../redux/reducers/musicPlayerSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { timeFormat } from '../../../utils/format';

const PlayListItem = ({
  track,
  current,
  idx,
}: {
  track: ITrack;
  current: boolean;
  idx: number;
}) => {
  const dispatch = useAppDispatch();
  const isPlaying = useAppSelector((state) => state.musicPlayer.isPlaying);
  const currentTrackIdx = useAppSelector(
    (state) => state.musicPlayer.currentTrackIdx
  );

  const onChangeTrack = () => {
    if (current) {
      dispatch(playToggle());
    } else {
      dispatch(changeTrackIdx(idx));
    }
  };

  return (
    <li
      className={`mb-2 flex items-center group ${
        currentTrackIdx && currentTrackIdx > idx && 'opacity-70'
      }`}
    >
      <div className="shrink-0 flex relative items-center justify-center">
        <div className="avatar">
          <div className="w-9 rounded">
            <img alt="artwork" crossOrigin="anonymous" src={track.artworkUrl} />
          </div>
        </div>
        <label
          className={`swap ${current && isPlaying && 'swap-active'} absolute`}
          onClick={() => onChangeTrack()}
        >
          <div
            className={`btn btn-circle swap-on btn-xs btn-primary ${
              current ? 'flex' : 'hidden group-hover:flex'
            }`}
          >
            <MdPause />
          </div>
          <div
            className={`btn btn-circle swap-off btn-xs btn-primary ${
              current ? 'flex' : 'hidden group-hover:flex'
            }`}
          >
            <MdPlayArrow />
          </div>
        </label>
      </div>
      <div className="flex-1 w-full px-2">
        <p className="opacity-50 hover:opacity-100 text-xs cursor-pointer">
          {track.user.username}
        </p>
        <p className="opacity-90 hover:opacity-100 text-xs cursor-pointer break-all line-clamp-1">
          {track.title}
        </p>
      </div>
      <div className="text-xs text-base-300">{timeFormat(track.duration)}</div>
    </li>
  );
};

const PlayListQueue = () => {
  const playList = useAppSelector((state) => state.musicPlayer.playList);
  const dispatch = useAppDispatch();
  const currentTrackIdx = useAppSelector(
    (state) => state.musicPlayer.currentTrackIdx
  );
  const onPlayListClear = () => {
    dispatch(playListClear());
  };
  const onClosePlayList = () => {
    dispatch(playListVisibleToggle());
  };
  return (
    <div className={`absolute w-full p-4 sm:w-[480px] bottom-10 right-0`}>
      <div className="w-full h-[520px] bg-white border">
        <div className="border-b">
          <div className="w-full flex items-center p-4">
            <p className="w-full text-lg">Next up</p>
            <p
              className="btn btn-outline btn-sm mr-2"
              onClick={onPlayListClear}
            >
              clear
            </p>
            <p className="btn btn-sm btn-ghost" onClick={onClosePlayList}>
              X
            </p>
          </div>
        </div>

        <ul className="p-4">
          {playList.map((track, idx) => {
            return (
              <PlayListItem
                track={track}
                key={idx}
                current={idx === currentTrackIdx}
                idx={idx}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PlayListQueue;
