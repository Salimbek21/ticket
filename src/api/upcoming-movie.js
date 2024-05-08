import { httpGet } from ".";

export const apiUpcomingMovieGet = (params) => {
  return httpGet({
    url: "/premiere-slides/upcoming",
    params: {
      index: 1,
      size: 10,
    },
  });
};
