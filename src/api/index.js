import axios from "axios";
import BASE_URL from "./url";

import Cookies from "universal-cookie";

const providerClient = axios.create({
  baseURL: `${BASE_URL}`,
});

providerClient.interceptors.request.use(
  (config) => {
    const cookie = new Cookies();
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      config.headers["Authorization"] = "Bearer " + access_token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

providerClient.interceptors.response.use(
  (response) => {
    const { status, data, statusText } = response;

    return response;
  },
  ({ response }) => {
    // const { status, data, statusText } = response;
    // if (status === 401) {
    // }

    return Promise.reject(response);
  }
);

export const httpGet = (params) =>
  providerClient.request({
    method: "get",
    ...params,
  });
export const httpDelete = (params) =>
  providerClient.request({
    method: "delete",
    ...params,
  });

export const httpPut = (params) =>
  providerClient.request({
    method: "put",
    ...params,
  });
export const httpPatch = (params) =>
  providerClient.request({
    method: "patch",
    ...params,
  });

export const httpPost = (params) =>
  providerClient.request({
    method: "post",
    ...params,
  });

export const handleError = (error) => {
  console.error(error.data.message);
};
