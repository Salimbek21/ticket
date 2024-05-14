import { handleError } from "@/api";
import { apiSignUp } from "@/api/auth";
import { ok } from "@/ui/tostify";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signUpThunk = createAsyncThunk(
  "signUp/signUpThunk",
  async (params, { rejectWithValue }) => {
    try {
      const res = await apiSignUp(params);
      ok("Вы успешно авторизовались!");
      return res;
    } catch (error) {
      handleError(error);
      return rejectWithValue(error);
    }
  }
);
