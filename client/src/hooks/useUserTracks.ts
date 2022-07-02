import useSWR from "swr";
import customAxios from "../utils/customAxios";

const fetcher = (userId: number) => {
  return () => {
    return customAxios.get(`/user/${userId}/tracks`).then((res) => res.data);
  };
};

export const useUserTracks = (userId: number) => {
  const { data, error, mutate } = useSWR(
    typeof window === "undefined" ? null : `/user/${userId}/tracks`,
    fetcher(userId),
    { refreshInterval: 0 }
  );
  return {
    collection: data?.collection as ITrack[],
    loading: !data && !error,
    mutate,
  };
};
