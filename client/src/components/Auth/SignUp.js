import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { addUser } from "../../store/auth-slice";
import axios from "axios";
import "../../styles/SignIn.css"

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
        console.log(res);
        if (res.data.message) {
          // Handler server error in this code block
        } else if (res.data.token) {
          dispatch(
            addUser({
              userId: res.data.result.userId,
              email: res.data.result.enteredEmail,
            })
          );
          setToken(res.data.token);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={validateSignUp}>
      <input ref={emailRef} placeholder="Email" type="text" id="email"></input>
      <br></br><br></br>
      <input ref={passRef} placeholder="Password" type="password" id="password"></input>
      <br></br><br></br>
      <input ref={reenteredPassRef} placeholder="Confirm Password" type="password" id="passwordretype"></input>
      <br></br><br></br>
      <button type="submit">Create Account</button>
    </form>
  );
};

export default SignUp;
