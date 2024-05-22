import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const premierMovieByIdThunk = createAsyncThunk(
	"sliders/fetchById",
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`http://185.196.213.181:32790/api/films/${id}`
			);
			return response.data.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
