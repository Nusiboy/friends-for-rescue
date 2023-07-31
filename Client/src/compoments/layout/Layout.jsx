import React, { useContext } from "react";
import { useState } from "react";
import "../layout/Layout.css";
import { Outlet, Link } from "react-router-dom";
import MobileButton from "../mobileButton/MobileButton";
import {Contextt} from '../../context/RefreshConmtext'
function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { ref, setRef, currentUser, setCurrentUser  } = useContext(Contextt);

  function signOut() {
    localStorage.removeItem("user-token");
    localStorage.removeItem("LoginName");
  }
  function renderLoginButton() {
    return (
      <Link className="headerLink" to={"/Login"}>
        Login
      </Link>
    );
  }
  function renderWelcomeButton() {
    return (
      <div className="headerLink" id="hello-user">
        Welcome {currentUser || "User"}
      </div>
    );
  }
  function renderSignOutButton() {
    return <button id="sign-out-btn" onClick={() => setRef(signOut)}>Sign out</button>;
  }
  return (
    <div>
      <div id="layoutMain">
        <div id="layoutHeader">
          <div id="mobileLinks">
            <MobileButton isMenu={isMenuOpen} setMenu={setIsMenuOpen} />
          </div>
          <div id="layoutLinks">
            <Link className="headerLink" to={"/"}>
              Map
            </Link>
            <Link  className="headerLink" to={"/googlemaps"} >googlemaps</Link>
            <Link className="headerLink" to={"/Register"}>
              Register
            </Link>
            {!localStorage.getItem("user-token") &&
              !localStorage.getItem("LoginName") &&
              renderLoginButton()}
            {localStorage.getItem("user-token") &&
              localStorage.getItem("LoginName") &&
              renderWelcomeButton()}
            {localStorage.getItem("user-token") &&
              localStorage.getItem("LoginName") &&
              renderSignOutButton()}
          </div>
          <h1 id="main-header">Friends for Rescue</h1>
        </div>
        {isMenuOpen && (
          <div id="divLinks">
            <Link
              className="headerLink"
              onClick={() => {
                setIsMenuOpen(false);
              }}
              to={"/"}
            >
              Map
            </Link>
            <Link
              className="headerLink"
              onClick={() => {
                setIsMenuOpen(false);
              }}
              to={"/Register"}
            >
              Register
            </Link>
            {!localStorage.getItem("user-token") &&
              !localStorage.getItem("LoginName") &&
              renderLoginButton()}
            {localStorage.getItem("user-token") &&
              localStorage.getItem("LoginName") &&
              renderWelcomeButton()}
            {localStorage.getItem("user-token") &&
              localStorage.getItem("LoginName") &&
              renderSignOutButton()}
          </div>
        )}
        <div id="layoutContent">
          <Outlet />
        </div>
        
      </div>
      
    </div>
  );
}
export default Layout;
