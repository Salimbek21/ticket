import { apiPremierMovieGet } from "@/api/premier-movie";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const premierMoviesThunk = createAsyncThunk(
  "sliders/apiPremierMovieGet",
  async (params, { rejectWithValue }) => {
    try {
      const response = await apiPremierMovieGet(params);
      return response?.data;
    } catch (error) {
      handleError(error);
      return rejectWithValue(error);
    }
  }
);
