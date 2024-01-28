import { createSlice } from "@reduxjs/toolkit";

const LoginSlice = createSlice({
  name: "login",
  initialState: {
    Logstate: false,
    value: 1,
  },
  reducers: {
    login(state) {
      state.Logstate = true;
    },
    logout(state) {
      state.Logstate = false;
    },
  },
});
export const authActions = LoginSlice.actions;
export default LoginSlice;
