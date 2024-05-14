import { createSlice } from "@reduxjs/toolkit";
import { accountMe } from "./accountThunk";

const initialState = {
  data: {},
  isLoading: true,
  status: null,
  error: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    clear: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [accountMe.pending]: (state) => {
      state.status = "pending";
    },
    [accountMe.fulfilled]: (state, action) => {
      state.data = action.payload.data;
      state.isLoading = false;
      state.status = "fulfilled";
    },
  },
});
export const {clear} = accountSlice.actions
export const accountReducer = accountSlice.reducer;
