import React from 'react';
import {
  nextTrack,
  playToggle,
  prevTrack,
} from '../../../redux/reducers/musicPlayerSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import MusicPlayerControllerView, {
  MusicPlayerControllerViewProps,
} from './MusicPlayerControllerView';

const MusicPlayerController = () => {
  const dispatch = useAppDispatch();
  const isPlaying = useAppSelector((state) => state.musicPlayer.isPlaying);

  const musicPlayerControllerViewProps: MusicPlayerControllerViewProps = {
    prevTrack: () => dispatch(prevTrack()),
    nextTrack: () => dispatch(nextTrack()),
    playToggle: () => dispatch(playToggle()),
    isPlaying,
  };
  return <MusicPlayerControllerView {...musicPlayerControllerViewProps} />;
};

export default MusicPlayerController;
