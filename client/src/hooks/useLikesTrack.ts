import customAxios from '../utils/customAxios';
import { useFetchMe } from './useFetchMe';

const useLikesTrack = (trackId: number | undefined) => {
  const { user } = useFetchMe();

  const likes = async () => {
    if (!trackId || !user) return;
    try {
      const res = await customAxios.put(
        `/user/${user.id}/track_likes/${trackId}`
      );
      return res.data;
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
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };
  const check = async () => {
    if (!trackId || !user) return;
    try {
      const res = await customAxios.get(
        `/user/${user.id}/track_likes/${trackId}`
      );
      return res.data;
    } catch (e) {
      console.log('check Error');
    }
  };

  return { likes, unlikes, check };
};

export default useLikesTrack;
