import { useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { addUser } from "../../store/auth-slice";
import { useHistory } from "react-router";
import axios from "axios";
import "../../styles/SignIn.css"

const SignIn = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const emailRef = useRef("");
  const passRef = useRef("");
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

  const validateSignIn = (event) => {
    event.preventDefault();
    const userInfo = {
      enteredEmail: emailRef.current.value,
      enteredPassword: passRef.current.value,
    };
    axios
      .post("http://localhost:3001/api/sign-in", userInfo)
      .then((res) => {
        // res.data.message will contain necessary info about why
        // sign up/in failed
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
    <div>
      <form onSubmit={validateSignIn}>
        <input type="text" placeholder="Email" id="email" ref={emailRef}></input>
        <br></br><br></br>
        <input type="password" placeholder="Password" id="password" ref={passRef}></input>
        <br></br><br></br>
        <button>Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
