import { handleError } from "@/api";
import { apiLogin } from "@/api/auth";

import { ok, errorMessage } from "@/ui/tostify";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const loginThunk = createAsyncThunk(
  "login/loginThunk",
  async (params, { rejectWithValue }) => {
    try {
      const response = await apiLogin(params);
      cookies.set("accessToken", response.data.data.token);
      ok("Вы успешно вошли в систему!");
      return response;
    } catch (error) {
      handleError(error);
      errorMessage(error.data.message);
      return rejectWithValue(error);
    }
  }
);
