import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    logoutDialog: false,
    user: localStorage.user ? JSON.parse(localStorage.user) : false,
  },
  reducers: {
    toggleLogoutDialog: (state) => {
      state.logoutDialog = !state.logoutDialog;
    },
    setAccess: (state, action) => {
      state.user.access = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { toggleLogoutDialog, setAccess, setUser } = authSlice.actions;
export default authSlice.reducer;
