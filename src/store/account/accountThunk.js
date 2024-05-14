import { apiAccountMe } from "@/api/account";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const accountMe = createAsyncThunk(
  "account/me",
  async (params, { rejectWithValue }) => {
    try {
      const res = await apiAccountMe(params);
      return res?.data;
    } catch (error) {
      handleError(error);
      return rejectWithValue(error);
    }
  }
);
