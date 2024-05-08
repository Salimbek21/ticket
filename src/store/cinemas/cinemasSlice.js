import { createSlice } from "@reduxjs/toolkit";
import { cinemasThunk } from "./cinemasThunk";

const initialState = {
	cinemas: [],
	selectedCinema: null,
	isLoading: true,
	status: null,
	error: null,
};

const cinemasSlice = createSlice({
	name: "sliders/cinemas",
	initialState,
	reducers: {},
	extraReducers: {
		[cinemasThunk.pending]: (state) => {
			state.status = "pending";
		},
		[cinemasThunk.fulfilled]: (state, action) => {
			state.cinemas = action.payload.data.items;
			state.isLoading = false;
			state.status = "fulfilled";
			state.selectedCinema = action.payload.data.items;
		},
	},
});

export const cinemasReducer = cinemasSlice.reducer;
