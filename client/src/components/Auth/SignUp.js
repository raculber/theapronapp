import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { addUser } from "../../store/auth-slice";
import axios from "axios";

const SignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const emailRef = useRef("");
  const passRef = useRef("");
  const reenteredPassRef = useRef("");
  const [token, setToken] = useState("");

  useEffect(() => {
    localStorage.setItem("token", token);
    if (token !== "") {
      axios
        .get("http://localhost:3001/api/auth", {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res);
          history.push("/");
        })
        //Use this code block if user not authenticated
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token, history]);

  const validateSignUp = (event) => {
    event.preventDefault();
    const userInfo = {
      enteredEmail: emailRef.current.value,
      enteredPassword: passRef.current.value,
      reenteredPassword: reenteredPassRef.current.value,
    };
    axios
      .post("http://localhost:3001/api/sign-up", userInfo)
      .then((res) => {
        // res.data.message will contain necessary info about why
        // sign up/in failed
        if (res.data.message) {
          // Handler server error in this code block
        } else if (res.data.token) {
          dispatch(
            addUser({
              userId: res.data.result.userId,
              email: res.data.result.email,
            })
          );
          setToken(res.data.token);
        }
      })
      .catch((err) => console.log(err));
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
