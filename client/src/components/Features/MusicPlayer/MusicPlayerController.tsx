import React from 'react';
import { BiArrowToLeft, BiArrowToRight } from 'react-icons/bi';
import { MdPause, MdPlayArrow } from 'react-icons/md';
import {
  nextTrack,
  playToggle,
  prevTrack,
} from '../../../redux/reducers/musicPlayerSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';

const MusicPlayerController = () => {
  const dispatch = useAppDispatch();
  const isPlaying = useAppSelector((state) => state.musicPlayer.isPlaying);

  const onPrevTrack = () => {
    dispatch(prevTrack());
  };
  const onNextTrack = () => {
    dispatch(nextTrack());
  };
  const onPlayToggle = () => {
    dispatch(playToggle());
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center text-2xl px-4 shrink-0">
        <BiArrowToLeft onClick={onPrevTrack} className="mr-4 cursor-pointer" />
        <label
          onClick={onPlayToggle}
          className={`swap mr-4 ${isPlaying && 'swap-active'}`}
        >
          <MdPause className="swap-on" />
          <MdPlayArrow className="swap-off" />
        </label>
        <BiArrowToRight className="cursor-pointer" onClick={onNextTrack} />
      </div>
    </div>
  );
};

export default MusicPlayerController;
