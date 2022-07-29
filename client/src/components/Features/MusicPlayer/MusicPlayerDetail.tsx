import React from 'react';
import { useAppSelector } from '../../../redux/store';

const MusicPlayerArtwork = ({ url }: { url: string }) => {
  return (
    <div className="shrink-0 flex">
      <div className="avatar">
        <div className="w-9 rounded">
          <img alt="artwork" crossOrigin="anonymous" src={url} />
        </div>
      </div>
    </div>
  );
};

const MusicPlayerDetail = () => {
  const currentTrack = useAppSelector(
    (state) => state.musicPlayer.currentTrack
  );
  if (!currentTrack) {
    return null;
  }
  return (
    <div className="flex items-center">
      <MusicPlayerArtwork url={currentTrack.artworkUrl || ''} />
      {/* Track */}
      <div className="flex-1 w-full px-4">
        <p className="opacity-50 hover:opacity-100 text-xs cursor-pointer">
          {currentTrack.user.username}
        </p>
        <p className="opacity-90 hover:opacity-100 text-xs cursor-pointer break-all line-clamp-1">
          {currentTrack.title}
        </p>
      </div>
    </div>
  );
};

export default MusicPlayerDetail;
