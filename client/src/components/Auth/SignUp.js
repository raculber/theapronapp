import { useRef } from "react";
import { useDispatch } from "react-redux";
import { sendUserData } from "../../store/auth-actions";

const SignUp = () => {
  const dispatch = useDispatch();
  const userRef = useRef("");
  const emailRef = useRef("");
  const passRef = useRef("");
  const reenteredPassRef = useRef("");

  const SignUp = (event) => {
    event.preventDefault();
    const userInfo = {
      enteredUser: userRef.current,
      enteredEmail: emailRef.current,
      enteredPassword: passRef.current,
      reenteredPass: reenteredPassRef.current,
    };
    dispatch(sendUserData(userInfo));
  };
  return (
    <form onSubmit={SignUp}>
      <label htmlFor="username" id="username">
        Username
      </label>
      <input ref={useRef} type="text" id="username"></input>
      <label htmlFor="email" id="email">
        Email
      </label>
      <input ref={emailRef} type="text" id="email"></input>
      <label htmlFor="password" id="password">
        Password
      </label>
      <input ref={passRef} type="text" id="password"></input>
      <label htmlFor="passwordretype" id="passwordretype">
        Re-Enter Password
      </label>
      <input ref={reenteredPassRef} type="text" id="passwordretype"></input>
      <button type="submit">Create Account</button>
    </form>
  );
};

export default SignUp;
