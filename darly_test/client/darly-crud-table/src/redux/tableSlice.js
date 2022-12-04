import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isTableDataLoading: false,
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    dataLoading: (state) => {
      state.isTableDataLoading = true;
    },
    dataLoaded: (state) => {
      state.isTableDataLoading = false;
    },
  },
});

export const { dataLoading, dataLoaded } = tableSlice.actions;

export default tableSlice.reducer;
