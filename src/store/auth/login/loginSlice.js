import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "./loginThunk";
import { Cookies } from "react-cookie";
import Router from "next/router";

const cookies = new Cookies();

const initialState = {
  data: null,
  isLoading: null,
  status: null,
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logOut: (state) => {
      state.data = null;
      state.error = null;
      state.status = null;
      cookies.remove("accessToken");
      cookies.remove("phoneNumber");
      Router.push("/");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = "pending";
        state.isLoading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.data = action.payload.data;
        state.isLoading = false;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = "rejected";
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logOut } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
