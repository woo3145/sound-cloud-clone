import moment from "moment";
import "moment/locale/ko";

export const timeFormat = (second: number): string => {
  const m = Math.floor(second / 60);
  const s = second % 60;
  return `${m}:${s}`;
};

export const dateFormat = (date: Date): string => {
  return moment(date).fromNow();
};
