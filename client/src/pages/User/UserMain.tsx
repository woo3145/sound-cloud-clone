import React from "react";
import TrackWaveCard from "../../components/Cards/TrackWaveCard";
import { useMockTracks } from "../../mockData/useMockTracks";

const UserMain = () => {
  const tracks = useMockTracks();

  return (
    <div className="w-full">
      <h3 className="py-5 text-2xl font-light">Recent</h3>
      <ul>
        {tracks.map((track, idx) => {
          return <TrackWaveCard track={track} key={idx} />;
        })}
      </ul>
    </div>
  );
};

export default UserMain;
