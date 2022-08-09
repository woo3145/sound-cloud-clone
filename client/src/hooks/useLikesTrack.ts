import useSWR from 'swr';
import customAxios from '../utils/customAxios';
import { useFetchMe } from './useFetchMe';

const CheckTrackFavoriteStateFetcher = (
  userId: number | undefined,
  trackId: number
) => {
  if (!userId) {
    return null;
  }
  return () => {
    return customAxios
      .get(`/user/${userId}/track_likes/${trackId}`)
      .then((res) => res.data);
  };
};

const useLikesTrack = (trackId: number) => {
  const { user } = useFetchMe();

  const { data, mutate } = useSWR(
    typeof window === 'undefined' || !user
      ? null
      : `/user/${user.id}/track_likes/${trackId}`,
    CheckTrackFavoriteStateFetcher(user?.id, trackId),
    { refreshInterval: 0 }
  );

  const likes = async () => {
    if (!trackId || !user) return;
    try {
      const res = await customAxios.put(
        `/user/${user.id}/track_likes/${trackId}`
      );
      if (res.data.ok) {
        mutate({ ...data, state: true });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const unlikes = async () => {
    if (!trackId || !user) return;
    try {
      const res = await customAxios.delete(
        `/user/${user.id}/track_likes/${trackId}`
      );
      if (res.data.ok) {
        mutate({ ...data, state: false });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return { likes, unlikes, state: data?.state ? true : false };
};

export default useLikesTrack;
