import { createSlice } from "@reduxjs/toolkit";

export const customersListSlice = createSlice({
  name: "customersList",
  initialState: {
    loading: false,
    data: localStorage.customersList
      ? JSON.parse(localStorage.customersList)
      : [],
    deleteLoading: false,
  },
  reducers: {
    setCustomersListData: (state, action) => {
      state.data = action.payload;
    },
    toggleCustomersListLoading: (state) => {
      state.loading = !state.loading;
    },
    toggleDeleteLoading: (state) => {
      state.deleteLoading = !state.deleteLoading;
    },
  },
});

export const {
  setCustomersListData,
  toggleCustomersListLoading,
  toggleDeleteLoading,
} = customersListSlice.actions;

export default customersListSlice.reducer;
