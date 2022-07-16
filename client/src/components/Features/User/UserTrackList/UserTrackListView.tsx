import React from "react";
import TrackCard, { TrackCardProps } from "../../Cards/TrackCard/TrackCard";

interface Props {
  tracks: ITrack[];
  filter: string | undefined;
  each: (data: ITrack, idx: number) => TrackCardProps;
}

const UserTrackListView = ({ tracks, filter, each }: Props) => {
  return (
    <div className="w-full pt-4">
      {tracks.length > 0 ? (
        <>
          {!filter && <h3 className="text-2xl font-light pb-4">Recent</h3>}
          <ul>
            {tracks.map((data, idx) => {
              const trackCardProps = each(data, idx);
              return <TrackCard key={idx} {...trackCardProps} />;
            })}
          </ul>
        </>
      ) : (
        <div className="pb-8">
          <p>Nothing to hear here</p>
        </div>
      )}
    </div>
  );
};

export default UserTrackListView;
