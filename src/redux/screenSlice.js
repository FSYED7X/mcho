import { createSlice } from "@reduxjs/toolkit";

export const screenSlice = createSlice({
  name: "screen",
  initialState: {
    sideNavOpen: localStorage.sideNavOpen
      ? JSON.parse(localStorage.sideNavOpen)
      : true,
    theme: localStorage.theme ? JSON.parse(localStorage.theme) : false,
    loading: false,
    snackbar: {
      open: false,
      mesg: "",
      type: "",
    },
    addBankDialog: false,
    addCustomerDialog: false,
    editCustomerDialog: false,
    customerToEdit: "",
    banksListLoading: false,
  },
  reducers: {
    openNav: (state) => {
      state.sideNavOpen = localStorage.sideNavOpen = true;
    },
    closeNav: (state) => {
      state.sideNavOpen = localStorage.sideNavOpen = false;
    },
    changeTheme: (state) => {
      state.theme = localStorage.theme = !state.theme;
    },
    toggleLoading: (state) => {
      state.loading = !state.loading;
    },
    openSnackbar: (state, action) => {
      state.snackbar.mesg = action.payload.mesg;
      state.snackbar.type = action.payload.type;
      state.snackbar.open = true;
    },
    closeSnackbar: (state) => {
      state.snackbar.open = false;
    },
    toggleAddBankDialog: (state) => {
      state.addBankDialog = !state.addBankDialog;
    },
    toggleAddCustomerDialog: (state) => {
      state.addCustomerDialog = !state.addCustomerDialog;
    },
    toggleBanksListLoading: (state) => {
      state.banksListLoading = !state.banksListLoading;
    },
    toggleEditCustomerDialog: (state, action) => {
      state.customerToEdit = action.payload;
      state.editCustomerDialog = !state.editCustomerDialog;
    },
  },
});

export const {
  toggleAddCustomerDialog,
  openNav,
  closeNav,
  changeTheme,
  toggleLoading,
  openSnackbar,
  closeSnackbar,
  toggleAddBankDialog,
  toggleBanksListLoading,
  toggleEditCustomerDialog,
} = screenSlice.actions;

export default screenSlice.reducer;
