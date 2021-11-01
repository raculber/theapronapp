import React, { useState } from "react";
import Logo from "../../assets/apronImage.png";
import { Link } from 'react-router-dom';
import ReorderIcon from "@material-ui/icons/Reorder";
import "../../styles/Navbar.css";

function Navbar(){
    const [openLinks, setOpenLinks] = useState(false)

    const toggleNavbar = () => {
        setOpenLinks(!openLinks);
    };

    return(
        <div className="navbar">
            <div className="leftSide" id={openLinks ? "open" : "close"}>
                <img src={Logo} alt="Apron Logo"/>
                <div className="hiddenLinks">
                    <Link to="/"> Home </Link>
                    <Link to="/sign-in"> Sign In </Link>
                    <Link to="/sign-up"> Sign Up </Link>
                </div>
            </div>
            <div className="rightSide">
                <Link to="/"> Home </Link>
                <Link to="/sign-in"> Sign In </Link>
                <Link to="/sign-up"> Sign Up </Link>
                <button onClick={toggleNavbar}>
                    <ReorderIcon />
                </button>
            </div>
        </div>
    );
}

export default Navbar;