import { useState } from "react";

const SignUp = () => {
  const [userData, setUserData] = useState({
    enteredEmail: "",
    enteredPassword: "",
    reenteredPass: "",
  });

  const emailChangeHandler = (event) => {
    setUserData({
      ...userData,
      enteredEmail: event.target.value,
    });
  };

  const passwordChangeHandler = (event) => {
    setUserData({
      ...userData,
      enteredPassword: event.target.value,
    });
  };

  const passRetypeChangeHandler = (event) => {
    setUserData({
      ...userData,
      reenteredPass: event.target.value,
    });
  };

  const SignUp = (event) => {
    event.preventDefault();
    console.log(userData);
  };
  return (
    <form onSubmit={SignUp}>
      <label htmlFor="email" id="email">
        Email
      </label>
      <input type="text" id="email" onChange={emailChangeHandler}></input>
      <label htmlFor="password" id="password">
        Password
      </label>
      <input type="text" id="password" onChange={passwordChangeHandler}></input>
      <label htmlFor="passwordretype" id="passwordretype">
        Re-Enter Password
      </label>
      <input
        type="text"
        id="passwordretype"
        onChange={passRetypeChangeHandler}
      ></input>
      <button type="submit">Create Account</button>
    </form>
  );
};

export default SignUp;
