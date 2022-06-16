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
  useEffect(() => {
    if (wavesurfer.current) {
      return;
    }
    wavesurfer.current = WaveSurfer.create({
      container: `#waveform-${track.title}`,
      barWidth: 3,
      barRadius: 3,
      cursorWidth: 1,
      height: 80,
      barGap: 3,
      responsive: true,
      backend: "MediaElementWebAudio",
    });
    wavesurfer.current.load(trackUrl);
  }, [track.title]);
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
    <li className="mb-9">
      <div className="flex">
        {/* Artwork Image*/}
        <div
          style={{ backgroundImage: `url(${track.artworkUrl})` }}
          className="w-40 h-40 mr-4 shrink-0 bg-center bg-cover"
        ></div>
        {/* content */}
        <div className="w-full">
          <div className="py-2 flex justify-between">
            <BsFillPlayCircleFill
              onClick={playToggle}
              className="w-9 h-9 mr-2 shrink-0 text-red-400 cursor-pointer"
            />
            <div className="w-full">
              <div className="text-sm text-neutral-400">
                {track.user.username}
              </div>
              <div>{track.title}</div>
            </div>
            <div className="shrink-0 text-neutral-300 text-sm">20 days ago</div>
          </div>

          <div id={`waveform-${track.title}`} className="w-full mb-4"></div>

          <div className="flex">
            <GrayButton icon={<AiFillHeart size={14} />} className="mr-1" />
            <GrayButton icon={<IoEllipsisHorizontalSharp size={14} />} />
          </div>
        </div>
      </div>
    </li>
  );
};

export default TrackWaveCard;
