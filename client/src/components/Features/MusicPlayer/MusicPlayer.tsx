import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import {
  changePlayTime,
  nextTrack,
} from '../../../redux/reducers/musicPlayerSlice';
import WaveSurfer from 'wavesurfer.js';
import PlayListQueue from './PlayListQueue';
import MusicPlayerController from './MusicPlayerController';
import MusicPlayerBar from './MusicPlayerBar';
import MusicPlayerDetail from './MusicPlayerDetail';
import MusicPlayerMoreMenu from './MusicPlayerMoreMenu';

const MusicPlayer = () => {
  const wavesurfer = useRef<null | WaveSurfer>(null);

  const dispatch = useAppDispatch();
  const currentTrack = useAppSelector(
    (state) => state.musicPlayer.currentTrack
  );
  const currentTrackIdx = useAppSelector(
    (state) => state.musicPlayer.currentTrackIdx
  );
  const isPlaying = useAppSelector((state) => state.musicPlayer.isPlaying);
  const playListVisible = useAppSelector(
    (state) => state.musicPlayer.playListVisible
  );

  // currentTrack이 변경되면 waveSurfer 재생성 후
  // ready, audioprocess, finish 이벤트 추가
  useEffect(() => {
    if (!currentTrack) {
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
      backend: 'WebAudio',
    });
    wavesurfer.current.load(currentTrack.audioUrl || '');

    wavesurfer.current.on('ready', () => {
      if (!wavesurfer.current) {
        return;
      }
      if (isPlaying) {
        wavesurfer.current.play();
      } else {
        wavesurfer.current.pause();
      }
    });

    wavesurfer.current.on('audioprocess', () => {
      if (wavesurfer.current?.isPlaying()) {
        dispatch(
          changePlayTime(Math.floor(wavesurfer.current.getCurrentTime()))
        );
      }
    });

    wavesurfer.current.on('finish', () => {
      if (!wavesurfer.current) {
        return;
      }
      dispatch(nextTrack());
    });
    // isPlaying 예외
    // eslint-disable-next-line
  }, [currentTrack, currentTrackIdx]);

  // isPlaying에 따라 오디오 재생
  useEffect(() => {
    if (!wavesurfer.current) {
      return;
    }
    if (isPlaying) {
      wavesurfer.current.play();
    } else {
      wavesurfer.current.pause();
    }
  }, [isPlaying]);

  // 오디오파일 변경시 재생시간 초기화
  useEffect(() => {
    if (!wavesurfer.current) {
      return;
    }
    wavesurfer.current.setCurrentTime(0);
  }, [currentTrackIdx]);

  if (!currentTrack) {
    return null;
  }
  return (
    <div className="fixed bottom-0 left-0 w-full bg-base-200 h-12 border-t border-base-300 flex justify-center">
      <div className="flex self-stretch max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg w-full relative">
        {playListVisible && <PlayListQueue />}
        {/* Controller */}
        <MusicPlayerController />

        <MusicPlayerBar />
        <div className="w-full max-w-sm px-2 flex items-center justify-between">
          <MusicPlayerDetail />

          <MusicPlayerMoreMenu />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
