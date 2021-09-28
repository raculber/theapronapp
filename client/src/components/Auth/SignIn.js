const SignIn = () => {
  const signIn = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={signIn}>
      <label htmlFor="email" id="email">
        Email
      </label>
      <input type="text" id="email"></input>
      <label htmlFor="password" id="password">
        Password
      </label>
      <input type="text" id="email"></input>
      <button>Sign In</button>
    </form>
  );
};

export default SignIn;
