import { addUser } from "./auth-slice";
import axios from "axios";
import { sendNotification } from "./notification-slice";

export const signUp = (userData) => {
  return (dispatch) => {
    axios
      .post("http://localhost:3001/api/sign-up", userData)
      .then((res) => {
        console.log(res);
        if (res.data.token) {
          dispatch(
            addUser({ userId: res.result.userId, email: res.result.email })
          );
          localStorage.setItem("token", res.data.token);
        } else {
          dispatch(sendNotification({ message: "Sign Up Failed" }));
        }
      })
      .catch((err) => console.log(err));
  };
};

export const signIn = (userData) => {
  return (dispatch) => {
    axios
      .post("http://localhost:3001/api/sign-in", userData)
      .then((res) => {
        console.log(res);
        if (res.data.token) {
          dispatch(
            addUser({ userId: res.result.userId, email: res.result.email })
          );
          localStorage.setItem("token", res.data.token);
        } else {
          dispatch(sendNotification({ message: "Login Failed" }));
        }
      })
      .catch((err) => console.log(err));
  };
};
