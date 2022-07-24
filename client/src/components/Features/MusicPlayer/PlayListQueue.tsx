import React from 'react';
import { useAppSelector } from '../../../redux/store';

const PlayListQueue = () => {
  const playList = useAppSelector((state) => state.musicPlayer.playList);
  console.log(playList);
  return (
    <div className={`absolute w-full p-4 sm:w-[480px] bottom-10 right-0`}>
      <div className="w-full h-[520px] bg-white border">
        <div className="border-b">
          <div className="w-full flex items-center p-4">
            <p className="w-full text-lg">Next up</p>
            <p className="btn btn-outline btn-sm mr-2">clear</p>
            <p className="btn btn-sm btn-ghost">X</p>
          </div>
        </div>

        <div className="p-4">gasdg</div>
      </div>
    </div>
  );
};

export default PlayListQueue;
