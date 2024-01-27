import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./CreateSlice";

export default configureStore({
  reducer: {
    login: LoginSlice.reducer,
  },
});
