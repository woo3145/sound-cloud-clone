import useSWR from "swr";
import customAxios from "../utils/customAxios";

const fetcher = (userId: number) => {
  return () => {
    return customAxios.get(`/user/${userId}`).then((res) => res.data);
  };
};

export const useUser = (userId: number) => {
  const { data, error, mutate } = useSWR(
    typeof window === "undefined" ? null : `/user/${userId}`,
    fetcher(userId),
    { refreshInterval: 0 }
  );
  return {
    user: data?.user ? (data.user as IUser) : null,
    loading: !data && !error,
    mutate,
  };
};
