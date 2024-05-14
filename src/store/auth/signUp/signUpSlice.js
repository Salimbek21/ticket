import { createSlice } from "@reduxjs/toolkit";
import { signUpThunk } from "./signUpThunk";

const initialState = {
  data: null,
  isLoading: null,
  status: null,
  error: null,
};

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpThunk.pending, (state) => {
        state.status = "pending";
        state.isLoading = true;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.isLoading = false;
        state.status = "fulfilled";
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.status = "rejected";
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const signUpReducer = signUpSlice.reducer;
