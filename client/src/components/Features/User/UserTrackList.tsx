import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { useFetchUserTracks } from "../../../hooks/useFetchUserTracks";
import TrackCard from "../../Shared/Cards/TrackCard";

interface Props {
  isMe: boolean;
}

const UserTrackList = ({ isMe }: Props) => {
  const { user_id, filter } = useParams();
  const { tracks, loading } = useFetchUserTracks(user_id ? +user_id : 0);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full pt-4">
      {tracks.length > 0 ? (
        <>
          {!filter && <h3 className="text-2xl font-light pb-4">Recent</h3>}
          <ul>
            {tracks.map((track, idx) => {
              return (
                <TrackCard tracks={tracks} track={track} key={idx} idx={idx} />
              );
            })}
          </ul>
        </>
      ) : (
        <div className="pb-8">
          <p>Nothing to hear here</p>
          {isMe && (
            <NavLink to="/upload" className="btn btn-primary">
              Upload Now
            </NavLink>
          )}
        </div>
      )}
    </div>
  );
};

export default UserTrackList;
