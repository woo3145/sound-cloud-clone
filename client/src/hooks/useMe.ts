import useSWR from "swr";
import customAxios from "../utils/customAxios";

const fetcher = () => {
  return customAxios.get("/profile").then((res) => res.data);
};

export const useMe = () => {
  const { data, error, mutate } = useSWR(
    typeof window === "undefined" ? null : "/profile",
    fetcher
  );

  return {
    user: data?.profile,
    loading: !data && !error,
    isLoggedIn: data?.profile && !error,
    mutate,
  };
};
