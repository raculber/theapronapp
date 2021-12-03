import React from "react";
import "./App.css";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Calendar from "./components/Calendar/Calendar";
import Home from "./components/Home/Home";
import Navbar from "./components/UI/Navbar";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import Pantry from "./components/Pantry/Pantry";
import SavedRecipes from "./components/SavedRecipes/SavedRecipes";
import GroceryLists from "./components/GroceryLists/GroceryLists";

// App component
function App() {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <div className="App">
      <Router>
        <Navbar pathName={location.pathname} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/sign-in" exact component={SignIn} />
          <Route path="/sign-up" exact component={SignUp} />
          <Route path="/pantry" exact component={Pantry} />
          <Route path="/savedRecipes" exact component={SavedRecipes} />
          <Route path="/grocery-lists" exact component={GroceryLists} />
          <Route path="/calendar" exact component={Calendar} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
