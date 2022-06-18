import React, { useEffect, useRef } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { Track } from "../../mockData/useMockTracks";
import GrayButton from "../Button/GrayButton";
import WaveSurfer from "wavesurfer.js";

interface Props {
  track: Track;
}

const TrackWaveCard = ({ track }: Props) => {
  const wavesurfer = useRef<null | WaveSurfer>(null);
  const trackUrl = "audio/cw-blues.mp3";
  // useEffect(() => {
  //   if (wavesurfer.current) {
  //     return;
  //   }
  //   wavesurfer.current = WaveSurfer.create({
  //     container: `#waveform-${track.title}`,
  //     barWidth: 3,
  //     barRadius: 3,
  //     cursorWidth: 1,
  //     height: 80,
  //     barGap: 3,
  //     responsive: true,
  //     backend: "MediaElementWebAudio",
  //   });
  //   wavesurfer.current.load(trackUrl);
  // }, [track.title]);
  const playToggle = () => {
    if (wavesurfer.current) {
      if (wavesurfer.current.isPlaying()) {
        wavesurfer.current.pause();
      } else {
        {
          const audioElements = document.querySelectorAll("audio");
          audioElements.forEach((audio) => {
            audio.pause();
            audio.currentTime = 0;
          });
          wavesurfer.current.play();
        }
      }
    }
  };
  return (
    <li className="mb-4">
      <div className="flex">
        {/* Artwork Image*/}
        <div
          style={{ backgroundImage: `url(${track.artworkUrl})` }}
          className="w-28 h-28 mr-4 shrink-0 bg-center bg-cover"
        ></div>
        {/* content */}
        <div className="w-full flex justify-center flex-col text-sm">
          <div className="flex mb-2 text-neutral-400">
            <BsFillPlayCircleFill
              onClick={playToggle}
              className="w-10 h-10 mr-2 shrink-0 text-red-400 cursor-pointer"
            />
            <div className="w-full">
              <div className="w-full flex justify-between items-center">
                {track.user.username}
                <div className="shrink-0 text-neutral-300">20 days ago</div>
              </div>
              <div className="w-full flex justify-between items-start">
                <p className="text-md h-auto text-black break-all pr-4">
                  {track.title}
                </p>
                <div className="rounded-md bg-slate-300 shrink-0 text-white px-2 py-0.5 text-xs first-letter:uppercase">
                  # {track.genre}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <GrayButton icon={<AiFillHeart size={14} />} className="mr-1" />
            <GrayButton icon={<IoEllipsisHorizontalSharp size={14} />} />
          </div>
        </div>
      </div>
    </li>
  );
};

export default TrackWaveCard;
