import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import notificationSlice from "./notification-slice";

const store = configureStore({
  reducer: {
    user: authSlice.reducer,
    notification: notificationSlice.reducer,
  },
});

export default store;
