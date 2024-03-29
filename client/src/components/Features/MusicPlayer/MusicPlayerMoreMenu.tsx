import React from 'react';
import { RiMenuUnfoldFill } from 'react-icons/ri';
import { playListVisibleToggle } from '../../../redux/reducers/musicPlayerSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import FollowUserButton from '../Buttons/FollowUserButton';
import LikesTrackButton from '../Buttons/LikesTrackButton';

const MusicPlayerMoreMenu = () => {
  const dispatch = useAppDispatch();
  const playListVisible = useAppSelector(
    (state) => state.musicPlayer.playListVisible
  );
  const trackId = useAppSelector(
    (state) => state.musicPlayer.currentTrack?.id
  ) as number;

  const artistId = useAppSelector(
    (state) => state.musicPlayer.currentTrack?.user.id
  ) as number;

  const openPlayListToggle = () => {
    dispatch(playListVisibleToggle());
  };
  return (
    <div className="shrink-0 text-lg flex gap-4 items-center">
      <LikesTrackButton trackId={trackId} />

      <FollowUserButton userId={artistId} />

      <label
        className="swap"
        htmlFor="playList-drawer"
        onClick={openPlayListToggle}
      >
        <input type="checkbox" readOnly checked={playListVisible} />
        <RiMenuUnfoldFill className="swap-on text-primary" />
        <RiMenuUnfoldFill className="swap-off" />
      </label>
    </div>
  );
};

export default MusicPlayerMoreMenu;
