import { createSlice } from "@reduxjs/toolkit";
import { filmsThunk } from "./filmsThunk";

const initialState = {
  films: [],
  isLoading: true,
  status: null,
  error: null,
};

const filmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {},
  extraReducers: {
    [filmsThunk.pending]: (state) => {
      state.status = "pending";
    },
    [filmsThunk.fulfilled]: (state, action) => {
      state.films = action.payload.data;
      state.isLoading = false;
      state.status = "fulfilled";
    },
  },
});

export const filmsReducer = filmsSlice.reducer;
