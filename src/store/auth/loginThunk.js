import { handleError } from "@/api";
import { apiLogin } from "@/api/auth";
import { ok } from "@/ui/tostify";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginAuth = createAsyncThunk(
    "login/loginAuth",
    async (params, { rejectWithValue }) => {
      try {
        const response = await apiLogin(params);
        const data = await response?.data.token;
        ok("Вы успешно авторизовались");
  
        return data;
      } catch (error) {
        handleError(error);
        return rejectWithValue(error);
      }
    }
  );