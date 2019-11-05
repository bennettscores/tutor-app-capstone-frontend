import React from "react";
import logo from "../images/logo.png";
import { NavLink } from "react-router-dom";

const Navbar = props => {
  const dynamicLink = (route, linkText) => {
    return (
      <div className="auth-link-wrapper">
        <NavLink to={route} activeClassName="nav-link-active">
          {linkText}
        </NavLink>
      </div>
    );
  };


  return (
    <div className="navbar">
      <div className="menu-icon">
        <ion-icon name="menu"></ion-icon>
      </div>
      <div className="navbar-logo">
        <img src={logo} alt="" />
      </div>
      <div className="navbar-links">
        <div className="home-link">
          <a href="/">Home</a>
        </div>
        <div className="find-a-tutor-link">
          <a href="/find-a-tutor">Find a Tutor</a>
        </div>
        <div className="Login-link">
          {props.loggedInStatus === "NOT_LOGGED_IN"
            ? dynamicLink("/login", "Sign In")
            : null}
        </div>
        <div className="LogoutLink">

          {props.loggedInStatus === "LOGGED_IN" ? (
            <a onClick={props.handleLogout}>Log out</a>
          ) : null}

        </div>
      </div>
    </div>
  );
};

export default Navbar;
