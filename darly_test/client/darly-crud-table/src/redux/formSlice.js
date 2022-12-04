import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    dataCreated: (state) => {
      state.value = !state.value;
    },
  },
});

export const { dataCreated } = formSlice.actions;

export default formSlice.reducer;
