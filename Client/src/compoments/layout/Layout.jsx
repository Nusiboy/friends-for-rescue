import React, { useState } from "react";
import "../layout/Layout.css";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();
  const [showregister, setShowregister] = useState(false);

  function signOut() {
    localStorage.removeItem("user-token");
    localStorage.removeItem("usernum");
    localStorage.removeItem("type");
    localStorage.removeItem("username");
    setShowregister(false);
    navigate("/");
  }

  return (
    <div>
      <div id="layoutMain">
        <div id="layoutHeader">
          <h1 id="main-header">Friends for Rescue</h1>
        </div>
        {localStorage.getItem("user-token") && ( // Include the && operator here
          <button id="sign-out-btn" onClick={signOut}>
            Sign out
          </button>
        )}
        <div id="layoutContent">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;