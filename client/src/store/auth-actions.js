import { addUser } from "./auth-slice";
import axios from "axios";

export const sendUserData = (userData) => {
  console.log(userData);
  return (dispatch) => {
    axios
      .post("http://localhost:3001/api/sign-up", userData)
      .then((res) => {
        console.log(res);
        if (res === "Success") {
          console.log("yay");
          dispatch(addUser(userData.enteredUser, userData.enteredEmail));
        }
      })
      .catch((err) => console.log(err));
  };
};
