import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../login/Login.css";
import { useNavigate } from "react-router-dom";
import { RefContext } from "../../context/RefreshConmtext";

function Login() {
  const [userNameValue, setUserNameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const { ref, setRef } = useContext(RefContext);
  const navigate = useNavigate();
  function loginUser() {
    axios
      .post("http://localhost:3000/users/login", {
        userName: userNameValue,
        password: passwordValue,
      })
      .then((user) => {
        console.log(user);
        localStorage.setItem("user-token", user.data.token);
        localStorage.setItem("type", user.data.type);
        localStorage.setItem("usernum", user.data.num);
        localStorage.setItem("username", user.data.userName);
        setRef(!ref);
        navigate("/GoogleMaps");
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  }
  return (
    <div id="login-container">
      <h1 id="welcome-header">Welcome to Firends for Rescue!</h1>
      <div id="login-secondery-container">
        <h2 id="login-header">Login</h2>
        <input
          className="login-input"
          type="text"
          name="username"
          placeholder="Username"
          onChange={(event) => {
            setUserNameValue(event.target.value);
          }}
        />
        <br />
        <input
          className="login-input"
          type="text"
          name="password"
          placeholder="Password"
          onChange={(event) => {
            setPasswordValue(event.target.value);
          }}
        />
        <br />
        <button id="login-btn" type="sumbit" onClick={loginUser}>
          login
        </button>
      </div>
        <Link className="link-to" to={"/Register"}>
          Haven't signed to our services? click to sign!
        </Link>
    </div>
  );
}
export default Login;
