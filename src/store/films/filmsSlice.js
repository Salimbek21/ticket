import { createSlice } from "@reduxjs/toolkit";
import { filmsThunk } from "./filmsThunk";

const initialState = {
  films: [],
  selectedFilms: null,
  isLoading: true,
  status: null,
  error: null,
};

const filmsSlice = createSlice({
  name: "sliders/films",
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
      state.selectedFilms = action.payload.data.items;
    },
  },
});

export const filmsReducer = filmsSlice.reducer;
