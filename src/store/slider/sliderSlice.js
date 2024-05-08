import { createSlice } from "@reduxjs/toolkit";
import { sliders } from "./sliderThunk";

const initialState = {
  sliders: [],
  isLoading: true,
  status: null,
  error: null,
};

const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {},
  extraReducers: {
    [sliders.pending]: (state) => {
      state.status = "pending";
    },
    [sliders.fulfilled]: (state, action) => {
      state.sliders = action.payload.data.items;
      state.isLoading = false;
      state.status = "fulfilled";
    },
  },
});

export const sliderReducer = sliderSlice.reducer;
