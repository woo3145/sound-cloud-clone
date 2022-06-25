import useSWR from "swr";
import { User } from "../mockData/useMockTracks";
import customAxios from "../utils/customAxios";

const fetcher = () => {
  const accessToken = JSON.parse(
    window.localStorage.getItem("accessToken") || "{}"
  );
  if (!accessToken) {
    return;
  }
  return customAxios.get("/profile").then((res) => res.data);
};

export const useMe = () => {
  const { data, error, mutate } = useSWR(
    typeof window === "undefined" ? null : "/profile",
    fetcher
  );
  return {
    user: data?.profile ? (data.profile as User) : null,
    loading: !data && !error,
    isLoggedIn: data?.profile && !error,
    mutate,
  };
};
