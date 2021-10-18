import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "user",
  initialState: {
    userId: "",
    email: "",
  },
  reducers: {
    addUser(state, action) {
      const newUser = action.payload;
      console.log(newUser);
      state.userId = newUser.userName;
      state.email = newUser.email;
    },
  },
});

export const { addUser } = authSlice.actions;
export default authSlice;
