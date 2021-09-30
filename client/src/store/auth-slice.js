import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "signUp",
  initialState: {
    userName: "",
    email: "",
    password: "",
    reenteredPassword: "",
  },
  reducers: {
    addUser(state, action) {
      const newUser = action.payload;
      state.userName = newUser.userName;
      state.email = newUser.email;
    },
  },
});

export const { addUser } = authSlice.actions;
export default authSlice;
