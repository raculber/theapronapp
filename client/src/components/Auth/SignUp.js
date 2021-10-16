import { useRef } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/auth-actions";
import { useHistory } from "react-router";
import axios from "axios";

const SignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const emailRef = useRef("");
  const passRef = useRef("");
  const reenteredPassRef = useRef("");

  const validateSignUp = (event) => {
    event.preventDefault();
    const userInfo = {
      enteredEmail: emailRef.current.value,
      enteredPassword: passRef.current.value,
      reenteredPassword: reenteredPassRef.current.value,
    };
    dispatch(signUp(userInfo));
    console.log(localStorage.getItem("token"));
    axios
      .get("http://localhost:3001/api/auth", {
        headers: {
          "access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        console.log("success!");
        history.push("/");
      })
      //Use this code block if user not authenticated
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={validateSignUp}>
      <label htmlFor="email" id="email">
        Email
      </label>
      <input ref={emailRef} type="text" id="email"></input>
      <label htmlFor="password" id="password">
        Password
      </label>
      <input ref={passRef} type="password" id="password"></input>
      <label htmlFor="passwordretype" id="passwordretype">
        Confirm Password
      </label>
      <input ref={reenteredPassRef} type="password" id="passwordretype"></input>
      <button type="submit">Create Account</button>
    </form>
  );
};

export default SignUp;
