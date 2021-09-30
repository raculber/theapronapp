import SignIn from "./components/Auth/SignIn";

import SignUp from "./components/Auth/SignUp";

import { Route, Switch, Redirect } from "react-router-dom";

// App component
function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/sign-in" />
      </Route>
      <Route path="/sign-in" eact>
        <SignIn />
      </Route>
      <Route path="/sign-up" exact>
        <SignUp />
      </Route>
    </Switch>
  );
}

export default App;
