import React from "react";
import { useParams } from "react-router-dom";
import TrackCard from "../../components/Cards/TrackCard";
import { useMe } from "../../hooks/useMe";
import { useUser } from "../../hooks/useUser";
import { useUserTracks } from "../../hooks/useUserTracks";

const UserMain = () => {
  const { user_id } = useParams();
  const { user } = useUser(user_id ? parseInt(user_id) : 0);
  const { user: me } = useMe();

  const { collection, loading } = useUserTracks(
    user_id ? parseInt(user_id) : 0
  );

  if (loading) {
    return <div>Loading ...</div>;
  }
  return (
    <div className="w-full">
      {collection.length > 0 ? (
        <>
          <h3 className="py-4 text-2xl font-light">Recent</h3>
          <ul>
            {collection.map((track, idx) => {
              return <TrackCard track={track} key={idx} idx={idx} />;
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
