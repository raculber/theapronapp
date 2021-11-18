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
  const [selectedTab, setSelectedTab] = useState("home");
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
  console.log(selectedTab);
  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <img src={Logo} alt="Apron Logo" />
        <div className="hiddenLinks">
          <Link
            to="/"
            onClick={() => setSelectedTab("home")}
            style={{
              borderBottom:
                selectedTab === "home" ? "3px solid rgb(0, 0, 0)" : "none",
              color:
                selectedTab === "home" ? "rgb(0, 0, 0)" : "rgb(92, 89, 89)",
            }}
          >
            {" "}
            Home{" "}
          </Link>
          {!loggedIn && (
            <Link
              to="/sign-in"
              onClick={() => setSelectedTab("sign-in")}
              style={{
                borderBottom:
                  selectedTab === "sign-in" ? "3px solid rgb(0, 0, 0)" : "none",
                color:
                  selectedTab === "sign-in"
                    ? "rgb(0, 0, 0)"
                    : "rgb(92, 89, 89)",
              }}
            >
              {" "}
              Sign In{" "}
            </Link>
          )}
          {!loggedIn && (
            <Link
              to="/sign-up"
              onClick={() => setSelectedTab("sign-up")}
              style={{
                borderBottom:
                  selectedTab === "sign-up" ? "3px solid rgb(0, 0, 0)" : "none",
                color:
                  selectedTab === "sign-up"
                    ? "rgb(0, 0, 0)"
                    : "rgb(92, 89, 89)",
              }}
            >
              {" "}
              Sign Up{" "}
            </Link>
          )}
          {loggedIn && (
            <Link
              to="/savedRecipes"
              onClick={() => setSelectedTab("saved-recipes")}
              style={{
                borderBottom:
                  selectedTab === "saved-recipes"
                    ? "3px solid rgb(0, 0, 0)"
                    : "none",
                color:
                  selectedTab === "saved-recipes"
                    ? "rgb(0, 0, 0)"
                    : "rgb(92, 89, 89)",
              }}
            >
              {" "}
              Saved Recipes{" "}
            </Link>
          )}
          {loggedIn && (
            <Link
              to="/Pantry"
              onClick={() => setSelectedTab("pantry")}
              style={{
                borderBottom:
                  selectedTab === "pantry" ? "3px solid rgb(0, 0, 0)" : "none",
                color:
                  selectedTab === "pantry" ? "rgb(0, 0, 0)" : "rgb(92, 89, 89)",
              }}
            >
              {" "}
              Pantry{" "}
            </Link>
          )}
          <Link
            to="/calendar"
            onClick={() => setSelectedTab("calendar")}
            style={{
              borderBottom:
                selectedTab === "calendar" ? "3px solid rgb(0, 0, 0)" : "none",
              color:
                selectedTab === "calendar" ? "rgb(0, 0, 0)" : "rgb(92, 89, 89)",
            }}
          >
            {" "}
            Calendar{" "}
          </Link>
          {loggedIn && <LogoutButton onClick={logoutHandler} />}
        </div>
      </div>
      <div className="rightSide">
        <Link
          to="/"
          onClick={() => setSelectedTab("home")}
          style={{
            borderBottom:
              selectedTab === "home" ? "3px solid rgb(0, 0, 0)" : "none",
            color: selectedTab === "home" ? "rgb(0, 0, 0)" : "rgb(92, 89, 89)",
          }}
        >
          {" "}
          Home{" "}
        </Link>
        {!loggedIn && (
          <Link
            to="/sign-in"
            onClick={() => setSelectedTab("sign-in")}
            style={{
              borderBottom:
                selectedTab === "sign-in" ? "3px solid rgb(0, 0, 0)" : "none",
              color:
                selectedTab === "sign-in" ? "rgb(0, 0, 0)" : "rgb(92, 89, 89)",
            }}
          >
            {" "}
            Sign In{" "}
          </Link>
        )}
        {!loggedIn && (
          <Link
            to="/sign-up"
            onClick={() => setSelectedTab("sign-up")}
            style={{
              borderBottom:
                selectedTab === "sign-up" ? "3px solid rgb(0, 0, 0)" : "none",
              color:
                selectedTab === "sign-up" ? "rgb(0, 0, 0)" : "rgb(92, 89, 89)",
            }}
          >
            {" "}
            Sign Up{" "}
          </Link>
        )}
        {loggedIn && (
          <Link
            to="/savedRecipes"
            onClick={() => setSelectedTab("saved-recipes")}
            style={{
              borderBottom:
                selectedTab === "saved-recipes"
                  ? "3px solid rgb(0, 0, 0)"
                  : "none",
              color:
                selectedTab === "saved-recipes"
                  ? "rgb(0, 0, 0)"
                  : "rgb(92, 89, 89)",
            }}
          >
            {" "}
            Saved Recipes{" "}
          </Link>
        )}
        {loggedIn && (
          <Link
            to="/Pantry"
            onClick={() => setSelectedTab("pantry")}
            style={{
              borderBottom:
                selectedTab === "pantry" ? "3px solid rgb(0, 0, 0)" : "none",
              color:
                selectedTab === "pantry" ? "rgb(0, 0, 0)" : "rgb(92, 89, 89)",
            }}
          >
            {" "}
            Pantry{" "}
          </Link>
        )}
        <Link
          to="/calendar"
          onClick={() => setSelectedTab("calendar")}
          style={{
            borderBottom:
              selectedTab === "calendar" ? "3px solid rgb(0, 0, 0)" : "none",
            color:
              selectedTab === "calendar" ? "rgb(0, 0, 0)" : "rgb(92, 89, 89)",
          }}
        >
          {" "}
          Calendar{" "}
        </Link>
        {loggedIn && <LogoutButton onClick={logoutHandler} />}
        <button className="reOrder" onClick={toggleNavbar}>
          <ReorderIcon />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
