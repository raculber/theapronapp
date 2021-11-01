import Home from "./components/Home/Home";
import Navbar from "./components/UI/Navbar";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import Pantry from "./components/Pantry/Pantry";

import { Route, Switch } from "react-router-dom";

// App component
function App() {
  
  return (
    <Switch>
      <Route path="/sign-in" exact>
        <SignIn />
      </Route>
      <Route path="/sign-up" exact>
        <SignUp />
      </Route>
      <Route path="/pantry" exact>
        <Pantry />
      </Route>
      <Route path="/" exact>
        <Home />
      </Route>
    </Switch>
  );
}

export default App;
