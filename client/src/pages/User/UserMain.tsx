import React from "react";
import { useParams } from "react-router-dom";
import TrackCard from "../../components/Cards/TrackCard";
import { useFetchMe } from "../../hooks/useFetchMe";
import { useFetchUser } from "../../hooks/useFetchUser";
import { useFetchUserTracks } from "../../hooks/useFetchUserTracks";

const UserMain = () => {
  const { user_id } = useParams();
  const { user } = useFetchUser(user_id ? parseInt(user_id) : 0);
  const { user: me } = useFetchMe();

  const { tracks, loading } = useFetchUserTracks(
    user_id ? parseInt(user_id) : 0
  );

  if (loading) {
    return <div>Loading ...</div>;
  }
  return (
    <div className="w-full">
      {tracks.length > 0 ? (
        <>
          <h3 className="py-4 text-2xl font-light">Recent</h3>
          <ul>
            {tracks.map((track, idx) => {
              return (
                <TrackCard tracks={tracks} track={track} key={idx} idx={idx} />
              );
            })}
          </ul>
        </>
      ) : (
        <div>
          <p>Nothing to hear here</p>
          {user?.id === me?.id && (
            <button className="btn btn-primary">Upload Now</button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMain;
