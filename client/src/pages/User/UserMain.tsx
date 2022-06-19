import React from "react";
import TrackCard from "../../components/Cards/TrackCard";
import { useMockTracks } from "../../mockData/useMockTracks";

const UserMain = () => {
  const tracks = useMockTracks();

  return (
    <div className="w-full">
      <h3 className="py-4 text-2xl font-light">Recent</h3>
      <ul>
        {tracks.map((track, idx) => {
          return <TrackCard track={track} key={idx} idx={idx} />;
        })}
      </ul>
    </div>
  );
};

export default UserMain;
