import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useFetchUserTracks } from "../../../../hooks/useFetchUserTracks";
import {
  playToggle,
  setCollection,
} from "../../../../redux/reducers/musicPlayerSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import customAxios from "../../../../utils/customAxios";
import UserTrackListView from "./UserTrackListView";

const UserTrackList = () => {
  const { user_id, filter } = useParams();
  const { tracks, loading } = useFetchUserTracks(user_id ? +user_id : 0);

  const dispatch = useAppDispatch();
  const musicPlayer = useAppSelector((state) => state.musicPlayer);

  const each = useCallback(
    (track: ITrack, idx: number) => {
      return {
        idx,
        track,
        setCollectionAndPlayToggle: () => {
          if (idx === musicPlayer.currentTrackIdx) {
            dispatch(playToggle());
            return;
          }
          dispatch(setCollection({ tracks, idx }));
        },
        deleteTrack: async () => {
          if (!window.confirm("정말 트랙을 삭제하시겠습니까?")) {
            return;
          }
          try {
            await customAxios.delete(`track/${track.id}`);
            return window.location.reload();
          } catch (e) {
            console.log(e);
          }
        },
      };
    },
    [dispatch, musicPlayer, tracks]
  );

  const UserTrackListProps = {
    tracks,
    filter,
    each,
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return <UserTrackListView {...UserTrackListProps} />;
};

export default UserTrackList;
