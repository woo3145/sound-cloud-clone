import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import useLikesTrack from '../../../hooks/useLikesTrack';

const LikesTrackButton = ({ trackId }: { trackId: number }) => {
  const { likes, unlikes, state } = useLikesTrack(trackId);

  const likesTrack = async (e: any) => {
    await likes();
  };
  const unlikesTrack = async (e: any) => {
    await unlikes();
  };

  return state ? (
    <AiFillHeart
      className="text-primary cursor-pointer"
      onClick={unlikesTrack}
    />
  ) : (
    <AiOutlineHeart className="cursor-pointer" onClick={likesTrack} />
  );
};

export default LikesTrackButton;
