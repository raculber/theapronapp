import { useRef } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/auth-actions";

const SignUp = () => {
  const dispatch = useDispatch();
  const emailRef = useRef("");
  const passRef = useRef("");
  const reenteredPassRef = useRef("");

  const validateSignUp = (event) => {
    event.preventDefault();
    const userInfo = {
      enteredEmail: emailRef.current.value,
      enteredPassword: passRef.current.value,
      reenteredPassRef: reenteredPassRef.current.value,
    };
    dispatch(signUp(userInfo));
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
