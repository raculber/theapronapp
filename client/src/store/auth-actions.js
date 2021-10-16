import { addUser } from "./auth-slice";
import axios from "axios";

export const signUp = (userData) => {
  return (dispatch) => {
    axios
      .post("http://localhost:3001/api/sign-up", userData)
      .then((res) => {
        console.log(res);
        if (res.data.token) {
          dispatch(
            addUser({
              userId: res.data.result.userId,
              email: res.data.result.email,
            })
          );
          localStorage.setItem("token", res.data.token);
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
        if (res.data.token) {
          dispatch(
            addUser({
              userId: res.data.result.userId,
              email: res.data.result.email,
            })
          );
          localStorage.setItem("token", res.data.token);
        }
      })
      .catch((err) => console.log(err));
  };
};
