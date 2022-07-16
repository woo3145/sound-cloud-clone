import React from "react";
import { useFetchMe } from "../../../../hooks/useFetchMe";
import { useAppSelector } from "../../../../redux/store";
import TrackCardView from "./TrackCardView";

export interface TrackCardProps {
  idx: number;
  track: ITrack;
  setCollectionAndPlayToggle: () => void;
  deleteTrack: () => Promise<void>;
}

const TrackCard = ({
  idx,
  track,
  setCollectionAndPlayToggle,
  deleteTrack,
}: TrackCardProps) => {
  const { user: me } = useFetchMe();
  const musicPlayer = useAppSelector((state) => state.musicPlayer);

  const TrackCardProps = {
    track,
    setCollectionAndPlayToggle,
    deleteTrack,
    isActive: musicPlayer.currentTrackIdx === idx && musicPlayer.isPlaying,
    isMyTrack: me?.id === track.user.id,
  };

  return <TrackCardView {...TrackCardProps} />;
};

export default TrackCard;
