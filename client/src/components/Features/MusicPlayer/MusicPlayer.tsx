import { BsFillPersonPlusFill, BsPersonCheckFill } from "react-icons/bs";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { MdPause, MdPlayArrow } from "react-icons/md";
import {
  nextTrack,
  playToggle,
  prevTrack,
} from "../../../redux/reducers/musicPlayerSlice";
import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { timeFormat } from "../../../utils/format";

const MusicPlayer = () => {
  const wavesurfer = useRef<null | WaveSurfer>(null);

  const dispatch = useAppDispatch();
  const musicPlayer = useAppSelector((state) => state.musicPlayer);
  const [curTime, setCurTime] = useState<number>(0);
  useEffect(() => {
    if (!musicPlayer.currentTrack) {
      return;
    }
    wavesurfer.current?.destroy();
    wavesurfer.current = WaveSurfer.create({
      container: `#waveform`,
      barWidth: 2,
      barRadius: 2,
      cursorWidth: 1,
      height: 30,
      barGap: 2,
      responsive: true,
      backend: "WebAudio",
    });
    wavesurfer.current.load(musicPlayer.currentTrack?.audioUrl || "");
    wavesurfer.current.on("ready", () => {
      if (!wavesurfer.current) {
        return;
      }
      if (musicPlayer.isPlaying) {
        wavesurfer.current.play();
      } else {
        wavesurfer.current.pause();
      }
    });
    wavesurfer.current.on("audioprocess", () => {
      if (wavesurfer.current?.isPlaying()) {
        setCurTime(Math.floor(wavesurfer.current.getCurrentTime()));
      }
    });
    wavesurfer.current.on("finish", () => {
      if (!wavesurfer.current) {
        return;
      }
      dispatch(nextTrack());
    });
    // isPlaying 예외
    // eslint-disable-next-line
  }, [musicPlayer.currentTrack, musicPlayer.currentTrackIdx]);

  useEffect(() => {
    if (!wavesurfer.current) {
      return;
    }
    if (musicPlayer.isPlaying) {
      wavesurfer.current.play();
    } else {
      wavesurfer.current.pause();
    }
  }, [musicPlayer.isPlaying]);

  useEffect(() => {
    if (!wavesurfer.current) {
      return;
    }
    wavesurfer.current.setCurrentTime(0);
  }, [musicPlayer.currentTrackIdx]);

  if (!musicPlayer.currentTrack) {
    return null;
  }
  return (
    <div className="fixed bottom-0 left-0 w-full bg-base-200 h-12 border-t border-base-300 flex justify-center">
      <div className="flex self-stretch max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg w-full">
        {/* Controller */}
        <div className="flex justify-between items-center">
          <div className="flex items-center text-2xl px-4 shrink-0">
            <BiArrowToLeft
              onClick={() => dispatch(prevTrack())}
              className="mr-4 cursor-pointer"
            />
            <label
              onClick={() => dispatch(playToggle())}
              className={`swap mr-4 ${musicPlayer.isPlaying && "swap-active"}`}
            >
              <MdPause className="swap-on" />
              <MdPlayArrow className="swap-off" />
            </label>
            <BiArrowToRight
              className="cursor-pointer"
              onClick={() => dispatch(nextTrack())}
            />
          </div>
        </div>
        <div className="flex-1 w-full flex items-center justify-between px-4 text-xs">
          <span className="shrink-0 w-14 text-center text-primary">
            {timeFormat(curTime)}
          </span>

          <div id={"waveform"} className="w-full"></div>

          <span className="shrink-0 w-14 text-center">
            {timeFormat(musicPlayer.currentTrack.duration)}
          </span>
        </div>
        <div className="shrink-0 w-full max-w-sm px-2 flex items-center justify-between">
          {/* Current Track Detail */}
          <div className="shrink-0 flex">
            <div className="avatar border border-base-300">
              <div className="w-9 rounded">
                <img
                  alt="artwork"
                  src={
                    musicPlayer.currentTrack.artworkUrl
                      ? musicPlayer.currentTrack.artworkUrl
                      : "https://api.lorem.space/image/face?hash=92048"
                  }
                />
              </div>
            </div>
          </div>
          {/* Track */}
          <div className="flex-1 w-full px-4">
            <p className="opacity-50 hover:opacity-100 text-xs cursor-pointer">
              {musicPlayer.currentTrack.user.username}
            </p>
            <p className="opacity-90 hover:opacity-100 text-xs cursor-pointer break-all line-clamp-1">
              {musicPlayer.currentTrack.title}
            </p>
          </div>
          {/* More Menu */}
          <div className="shrink-0 text-lg flex items-center">
            <label className="swap mr-3">
              <input type="checkbox" />
              <AiFillHeart className="swap-on text-primary" />
              <AiOutlineHeart className="swap-off" />
            </label>

            <label className="swap mr-3">
              <input type="checkbox" />
              <BsPersonCheckFill className="swap-on text-primary" />
              <BsFillPersonPlusFill className="swap-off" />
            </label>

            <label className="swap">
              <input type="checkbox" />
              <RiMenuUnfoldFill className="swap-on text-primary" />
              <RiMenuUnfoldFill className="swap-off" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
