import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./signupSlice";

export default configureStore({
  reducer: {
      signUp = signupReducer
  },
});
