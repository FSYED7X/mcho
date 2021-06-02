import { createSlice } from "@reduxjs/toolkit";

export const operatorsListSlice = createSlice({
  name: "operatorsList",
  initialState: {
    loading: false,
    data: localStorage.operatorsList
      ? JSON.parse(localStorage.operatorsList)
      : [],
    deleteLoading: false,
  },
  reducers: {
    setOperatorsListData: (state, action) => {
      state.data = action.payload;
    },
    toggleOperatorsListLoading: (state) => {
      state.loading = !state.loading;
    },
    toggleDeleteLoading: (state) => {
      state.deleteLoading = !state.deleteLoading;
    },
  },
});

export const {
  setOperatorsListData,
  toggleOperatorsListLoading,
  toggleDeleteLoading,
} = operatorsListSlice.actions;

export default operatorsListSlice.reducer;
