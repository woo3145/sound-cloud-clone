import useSWR from 'swr';
import customAxios from '../utils/customAxios';
import { useFetchMe } from './useFetchMe';

const CheckFollowStateFetcher = (userId: number | undefined) => {
  if (!userId) {
    return null;
  }
  return () => {
    return customAxios.get(`/me/followings/${userId}`).then((res) => res.data);
  };
};

const useFollowUser = (userId: number) => {
  const { user } = useFetchMe();

  const { data, mutate } = useSWR(
    typeof window === 'undefined' || !user ? null : `/me/followings/${userId}`,
    CheckFollowStateFetcher(userId),
    { refreshInterval: 0 }
  );

  const follows = async () => {
    if (!user) return;
    try {
      const res = await customAxios.put(`/me/followings/${userId}`);
      if (res.data.ok) {
        mutate({ ...data, state: true });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const unfollows = async () => {
    if (!user) return;
    try {
      const res = await customAxios.delete(`/me/followings/${userId}`);
      if (res.data.ok) {
        mutate({ ...data, state: false });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return { follows, unfollows, state: data?.state ? true : false };
};

export default useFollowUser;
