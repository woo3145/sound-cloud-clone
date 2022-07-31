import React, { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsFillPersonPlusFill, BsPersonCheckFill } from 'react-icons/bs';
import { RiMenuUnfoldFill } from 'react-icons/ri';
import useLikesTrack from '../../../hooks/useLikesTrack';
import { playListVisibleToggle } from '../../../redux/reducers/musicPlayerSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';

const LikesButton = ({ trackId }: { trackId: number }) => {
  const [active, setActive] = useState(false);
  const { likes, unlikes, check } = useLikesTrack(trackId);

  useEffect(() => {
    const checkState = async () => {
      const { state } = await check();
      setActive(state);
    };
    checkState();
  }, [check, trackId]);

  const likesTrack = async (e: any) => {
    const data = await likes();
    if (data.ok) setActive(true);
  };
  const unlikesTrack = async (e: any) => {
    const data = await unlikes();
    if (data.ok) setActive(false);
  };

  return active ? (
    <AiFillHeart className="text-primary mr-3" onClick={unlikesTrack} />
  ) : (
    <AiOutlineHeart className="mr-3" onClick={likesTrack} />
  );
};

const MusicPlayerMoreMenu = () => {
  const dispatch = useAppDispatch();
  const playListVisible = useAppSelector(
    (state) => state.musicPlayer.playListVisible
  );
  const trackId = useAppSelector(
    (state) => state.musicPlayer.currentTrack?.id
  ) as number;

  const followUser = () => {
    console.log('Follow User');
  };

  const openPlayListToggle = () => {
    dispatch(playListVisibleToggle());
  };
  return (
    <div className="shrink-0 text-lg flex items-center">
      <LikesButton trackId={trackId} />

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
