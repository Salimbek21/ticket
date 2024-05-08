import { httpPost } from ".";

// export const API_login = (data) =>
//   httpPost({
//     url: "/account/login",
//     data,
//   });

// export const apiRegistration = (params) => {
//   return httpPost({
//     url: "/auth/signup",
//     data: {
//       ...params,
//     },
//   });
// };

// export const apiCodeUpdate = (phone) => {
//   return httpPost({
//     url: "/auth/code/update",
//     data: {
//       phone,
//     },
//   });
// };

export const apiLogin = (params) => {
  return httpPost({
      url: '/account/login',
      data: {
          ...params
      }
  })
}
