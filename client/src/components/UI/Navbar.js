import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Logo from "../../images/apronImage.png";
import { Link } from "react-router-dom";
import ReorderIcon from "@material-ui/icons/Reorder";
import LogoutButton from "./LogoutButton";
import { useSelector } from "react-redux";
import { removeUser } from "../../store/auth-slice";
import "../../styles/Navbar.css";
import { createBrowserHistory } from "history";

function Navbar(props) {
  const [openLinks, setOpenLinks] = useState(false);
  const history = createBrowserHistory({ forceRefresh: true });
  const [loggedIn, setLoggedIn] = useState(
    useSelector((state) => state.user.isLoggedIn)
  );
  const dispatch = useDispatch();

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };
  const logoutHandler = () => {
    localStorage.setItem("token", "");
    localStorage.removeItem("persist:root");
    dispatch(removeUser);
    history.push("/");
    setLoggedIn(false);
  };
  console.log(loggedIn);
  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <img src={Logo} alt="Apron Logo" />
        <div className="hiddenLinks">
          <Link to="/"> Home </Link>
          {!loggedIn && <Link to="/sign-in"> Sign In </Link>}
          {!loggedIn && <Link to="/sign-up"> Sign Up </Link>}
          {loggedIn && <Link to= "/savedRecipes"> Saved Recipes </Link> }
          {loggedIn && <Link to= "/Pantry"> Pantry </Link>}
          {loggedIn && <LogoutButton />}
        </div>
      </div>
      <div className="rightSide">
        <Link to="/"> Home </Link>
        {!loggedIn && <Link to="/sign-in"> Sign In </Link>}
        {!loggedIn && <Link to="/sign-up"> Sign Up </Link>}
        {loggedIn && <Link to= "/savedRecipes"> Saved Recipes </Link>}
        {loggedIn && <Link to= "/Pantry"> Pantry </Link>}
        {loggedIn && <LogoutButton onClick={logoutHandler} />}
        <button className="reOrder" onClick={toggleNavbar}>
          <ReorderIcon />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
