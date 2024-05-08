import { createSlice } from "@reduxjs/toolkit";
import { premierMoviesThunk } from "./premierMoviesThunk";


const initialState = {
  premierMovie: [],
  isLoading: true,
  status: null,
  error: null,
};

const premierMoviesSlice = createSlice({
  name: "sliders/apiPremierMovieGet",
  initialState,
  reducers: {},
  extraReducers: {
    [premierMoviesThunk.pending]: (state) => {
      state.status = "pending";
    },
    [premierMoviesThunk.fulfilled]: (state, action) => {
      state.premierMovie = action.payload.data.items;
      state.isLoading = false;
      state.status = "fulfilled";
    },
  },
});

export const premierMoviesReducer = premierMoviesSlice.reducer;
