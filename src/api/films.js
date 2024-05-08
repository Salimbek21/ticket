import { httpGet } from ".";

export const apiGetFilms = (params) => {
  return httpGet({
    url: "films/active-sessions",
    params
  });
};

export const apiCinemasDetail = (id) => {
  return httpGet({
    url: `/cinemas/${id}`,
  });
};
