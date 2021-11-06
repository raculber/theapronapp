import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "user",
  initialState: {
    userId: "",
    email: "",
    isLoggedIn: false,
  },
  reducers: {
    addUser(state, action) {
      const newUser = action.payload;
      state.userId = newUser.userId;
      state.email = newUser.email;
      state.isLoggedIn = true;
    },
    removeUser(state) {
      state.userId = "";
      state.email = "";
      state.isLoggedIn = false;
    },
  },
});

export const { addUser, removeUser } = authSlice.actions;
export default authSlice;
