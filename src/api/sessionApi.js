import { httpGet } from ".";

export const apiGetSession = (params) => {
  return httpGet({
    url: "/booking-sessions",
    params,
  });
};
