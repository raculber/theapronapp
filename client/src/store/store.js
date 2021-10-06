import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import notificationSlice from "./notification-slice";

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    notification: notificationSlice.reducer,
  },
});
