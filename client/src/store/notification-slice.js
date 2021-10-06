import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: "",
  },
  reducers: {
    sendNotification(state, action) {
      state.message = action.payload.message;
    },
  },
});

export const { sendNotification } = notificationSlice.actions;
export default notificationSlice;
