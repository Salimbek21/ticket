import { httpDelete, httpGet, httpPut } from ".";

export const apiAccountMe = (params) => {
  return httpGet({
    url: "/account/me",
    params,
  });
};

export const apiUpdate = (params) => {
  return httpPut({
    url: "/users",
    data: params,
  });
};

export const apiDeleteAccount = () => {
  return httpDelete({
    url: "/users/me",
  });
};

export const apiUploadImg = (file) => {
  return httpPut({
    url: "/users/picture",
    data: file,
  });
};
