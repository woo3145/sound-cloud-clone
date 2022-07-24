import React from 'react';
import { BiArrowToLeft, BiArrowToRight } from 'react-icons/bi';
import { MdPause, MdPlayArrow } from 'react-icons/md';

export interface MusicPlayerControllerViewProps {
  prevTrack: () => void;
  nextTrack: () => void;
  playToggle: () => void;
  isPlaying: boolean;
}

const MusicPlayerControllerView = ({
  prevTrack,
  nextTrack,
  playToggle,
  isPlaying,
}: MusicPlayerControllerViewProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center text-2xl px-4 shrink-0">
        <BiArrowToLeft onClick={prevTrack} className="mr-4 cursor-pointer" />
        <label
          onClick={playToggle}
          className={`swap mr-4 ${isPlaying && 'swap-active'}`}
        >
          <MdPause className="swap-on" />
          <MdPlayArrow className="swap-off" />
        </label>
        <BiArrowToRight className="cursor-pointer" onClick={nextTrack} />
      </div>
    </div>
  );
};

export default MusicPlayerControllerView;
