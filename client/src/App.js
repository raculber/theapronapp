import React from 'react';
import "./App.css";
import Home from "./components/Home/Home";
import Navbar from "./components/UI/Navbar";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import Pantry from "./components/Pantry/Pantry";

import { 
  BrowserRouter as Router,
  Switch,
  Route, 
} from "react-router-dom";

// App component
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/sign-in" exact component={SignIn} />
          <Route path="/sign-up" exact component={SignUp} />
          <Route path="/pantry" exact component={Pantry} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
