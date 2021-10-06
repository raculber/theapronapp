import { useDispatch } from "react-redux";
import { useRef } from "react";
import { signIn } from "../../store/auth-actions";

const SignIn = () => {
  const dispatch = useDispatch();
  const emailRef = useRef("");
  const passRef = useRef("");
  const validateSignIn = (event) => {
    event.preventDefault();
    const userInfo = {
      enteredEmail: emailRef.current.value,
      enteredPassword: passRef.current.value,
    };
    dispatch(signIn(userInfo));
  };

  return (
    <form onSubmit={validateSignIn}>
      <label htmlFor="email" id="email">
        Email
      </label>
      <input type="text" id="email" ref={emailRef}></input>
      <label htmlFor="password" id="password">
        Password
      </label>
      <input type="password" id="password" ref={passRef}></input>
      <button>Sign In</button>
    </form>
  );
};

export default SignIn;
