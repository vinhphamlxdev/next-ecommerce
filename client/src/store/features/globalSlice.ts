import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {
  isSticky: boolean;
  isLoading: boolean;
}

const initialState: GlobalState = {
  isSticky: false,
  isLoading: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setBgHeaderAdmin: (state, action: PayloadAction<boolean>) => {
      state.isSticky = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setBgHeaderAdmin, setLoading } = globalSlice.actions;

export default globalSlice.reducer;
