import { httpGet } from ".";

export const apiSlider = (params) => {
  return httpGet({
    url: "/cover-slides",
    params,
  });
};
