import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsFillPersonPlusFill, BsPersonCheckFill } from 'react-icons/bs';
import { RiMenuUnfoldFill } from 'react-icons/ri';
import { playListVisibleToggle } from '../../../redux/reducers/musicPlayerSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';

const MusicPlayerMoreMenu = () => {
  const dispatch = useAppDispatch();
  const playListVisible = useAppSelector(
    (state) => state.musicPlayer.playListVisible
  );

  const likeTrack = () => {
    console.log('Like Track');
  };

  const followUser = () => {
    console.log('Follow User');
  };

  const openPlayListToggle = () => {
    dispatch(playListVisibleToggle());
  };
  return (
    <div className="shrink-0 text-lg flex items-center">
      <label className="swap mr-3" onClick={likeTrack}>
        <input type="checkbox" />
        <AiFillHeart className="swap-on text-primary" />
        <AiOutlineHeart className="swap-off" />
      </label>

      <label className="swap mr-3" onClick={followUser}>
        <input type="checkbox" />
        <BsPersonCheckFill className="swap-on text-primary" />
        <BsFillPersonPlusFill className="swap-off" />
      </label>

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
