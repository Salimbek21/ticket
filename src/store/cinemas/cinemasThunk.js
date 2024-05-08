import { apiCinemasGet } from "@/api/cinemas";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const cinemasThunk = createAsyncThunk(
  "sliders/cinemas",
  async (params, { rejectWithValue }) => {
    try {
      const response = await apiCinemasGet(params);
      return response?.data;
    } catch (error) {
      handleError(error);
      return rejectWithValue(error);
    }
  }
);
