import React from 'react';
import { BsFillPersonPlusFill, BsPersonCheckFill } from 'react-icons/bs';
import useFollowUser from '../../../hooks/useFollowUser';

const FollowUserButton = ({ userId }: { userId: number }) => {
  const { follows, unfollows, state } = useFollowUser(userId);

  const followUser = async (e: any) => {
    await follows();
  };
  const unfollowUser = async (e: any) => {
    await unfollows();
  };

  return state ? (
    <BsPersonCheckFill
      className="text-primary cursor-pointer"
      onClick={unfollowUser}
    />
  ) : (
    <BsFillPersonPlusFill className="cursor-pointer" onClick={followUser} />
  );
};

export default FollowUserButton;
