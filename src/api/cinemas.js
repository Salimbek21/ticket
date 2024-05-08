import { httpGet } from ".";

export const apiCinemasGet = (params) => {
  return httpGet({
    url: "/cinemas",
    params: {
      index: 1,
      size: 10,
    },
  });
};

export const apiCinemasDetail = (id) => {
  return httpGet({
    url: `/cinemas/${id}`,
  });
};
