import React from 'react';
import { useAppSelector } from '../../../redux/store';
import { timeFormat } from '../../../utils/format';

const MusicPlayerBar = () => {
  const currentTime = useAppSelector((state) => state.musicPlayer.currentTime);
  const currentTrack = useAppSelector(
    (state) => state.musicPlayer.currentTrack
  );

  if (!currentTrack) {
    return null;
  }
  return (
    <div className="flex-1 w-full flex items-center justify-between px-4 text-xs">
      <span className="shrink-0 w-14 text-center text-primary">
        {timeFormat(currentTime)}
      </span>

      <div id={'waveform'} className="w-full"></div>

      <span className="shrink-0 w-14 text-center">
        {timeFormat(currentTrack.duration)}
      </span>
    </div>
  );
};

export default MusicPlayerBar;
