import { apiSlider } from "@/api/slider";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const sliders = createAsyncThunk(
  "sliders/main",
  async (params, { rejectWithValue }) => {
    try {
      const response = await apiSlider(params);
      return response?.data;
    } catch (error) {
      handleError(error);
      return rejectWithValue(error);
    }
  }
);
