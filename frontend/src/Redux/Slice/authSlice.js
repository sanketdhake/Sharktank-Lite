import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userType: "Entrepreneur", // 'Entrepreneur', 'Shark', 'Admin'
  userId: null, // User ID after login
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserAction: (state, action) => {
      state.userType = action.payload;
    },
    loginAction: (state, action) => {
      state.userId = action.payload.token;
    },
    logoutAction: (state, action) => {
      state.userId = null;
    },
    clearUserAction: (state) => {
      state.userType = "";
      state.userId = null;
    },
  },
});

export const { setUserAction, loginAction, logoutAction, clearUserAction } =
  authSlice.actions;
export default authSlice.reducer;
