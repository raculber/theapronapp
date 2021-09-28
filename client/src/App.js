import SignIn from "./components/SignIn/SignIn";

import { Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/sign-in" />
      </Route>
      <Route path="/sign-in">
        <SignIn />
      </Route>
    </Switch>
  );
}

export default App;
