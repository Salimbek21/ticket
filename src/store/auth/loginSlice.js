import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";
import { loginAuth } from "./loginThunk";

const cookies = new Cookies();
const access_token = cookies.get("access_token")
  ? cookies.get("access_token")
  : null;

const initialState = {
  access_token: null,
  isLoading: null, // Changed from isLoader for clarity
  status: null,
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAuth.pending, (state) => {
        state.status = "pending";
        state.isLoading = true;
      })
      .addCase(loginAuth.fulfilled, (state, action) => {
        state.access_token = action.payload;
        state.isLoading = false;
        state.status = "fulfilled";
      })
      .addCase(loginAuth.rejected, (state, action) => {
        state.status = "rejected";
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const loginReducer = loginSlice.reducer;
