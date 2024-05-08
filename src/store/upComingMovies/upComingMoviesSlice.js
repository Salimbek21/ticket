import { createSlice } from "@reduxjs/toolkit";
import { upComingMoviesThunk } from "./upComingMoviesThunk";

const initialState = {
  upComingMovie: [],
  isLoading: true,
  status: null,
  error: null,
};

const upComingSlice = createSlice({
  name: "sliders/upComingMoviesGet",
  initialState,
  reducers: {},
  extraReducers: {
    [upComingMoviesThunk.pending]: (state) => {
      state.status = "pending";
    },
    [upComingMoviesThunk.fulfilled]: (state, action) => {
      state.upComingMovie = action.payload.data.items;
      state.isLoading = false;
      state.status = "fulfilled";
    },
  },
});

export const upComingSliceReducer = upComingSlice.reducer;
