import { addUser } from "./auth-slice";
import axios from "axios";

export const sendUserData = (userData) => {
  return (dispatch) => {
    axios
      .post("http://localhost:3000/sign-up", userData)
      .then((res) => {
        if (res === "Success") {
          console.log("yay");
          dispatch(addUser(userData.username, userData.email));
        }
      })
      .catch((err) => console.log(err));
  };
};
