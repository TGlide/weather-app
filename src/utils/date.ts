import { format, fromUnixTime } from "date-fns";

export const formatDatetime = (dt: number) => {
  const date = fromUnixTime(dt);

  return format(date, "eee");
};
