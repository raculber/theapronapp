import { createSlice } from "@reduxjs/toolkit";

const signUpSlice = createSlice({
  name: "signUp",
  initialState: {
    userId: "",
    email: "",
    password: "",
  },
  reducers: {
    addUser(state, action) {
      const newUser = action.payload;
      state.email = newUser.email;
      state.password = newUser.password;
    },
  },
});

export const { addUser } = signUpSlice.actions;
export default signUpSlice.reducer;
