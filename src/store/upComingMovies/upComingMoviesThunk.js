
import { apiUpcomingMovieGet } from "@/api/upcoming-movie";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const upComingMoviesThunk = createAsyncThunk(
  "sliders/upComingMoviesGet",
  async (params, { rejectWithValue }) => {
    try {
      const response = await apiUpcomingMovieGet(params);
      return response?.data;
    } catch (error) {
      handleError(error);
      return rejectWithValue(error);
    }
  }
);
