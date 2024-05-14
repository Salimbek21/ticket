import { apiGetFilms } from "@/api/films";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const filmsThunk = createAsyncThunk(
	"films/filmsGet",
	async (params, { rejectWithValue }) => {
		try {
			const response = await apiGetFilms(params);
			return response?.data;
		} catch (error) {
			handleError(error);
			return rejectWithValue(error);
		}
	}
);
