import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../login/Login.css";
import { useNavigate } from "react-router-dom";

import { RefContext } from "../../context/RefreshConmtext";

function Login() {
  const [userNameValue, setUserNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [typeValue, setTypeValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [refresh, setRefresh] = useState();
  const { ref, setRef } = useContext(RefContext);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then(({ data }) => setUser(data))
      .catch((err) => console.log(err.message));
  }, [refresh]);
  function loginUser() {
    axios
      .post("http://localhost:3001/users/login", {
        userName: userNameValue,
        password: passwordValue,
        type: typeValue,
      })
      .then((user) => {
        console.log(user);
        localStorage.setItem("user-token", user.data.token);
        localStorage.setItem("LoginName", userNameValue);
        localStorage.setItem("type", typeValue);
        localStorage.setItem("usernum", phoneValue);
console.log(typeValue);
        setRef(!ref);
        navigate("/");
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  }
  return (
    <div id="login-container">
      <div id="login-secondery-container">
        <h1 id="login-header">Login</h1>
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
        <select
          onChange={(event) => {
            setTypeValue(event.target.value);
          }}
          className="select-register"
          name="type"
          value={typeValue}
        >
          <option default selected>select type</option>
          <option  value="user">
            User
          </option>
          <option value="admin">Admin</option>
        </select>
        <br />
        <button id="login-btn" type="sumbit" onClick={loginUser}>
          login
        </button>
      </div>
    </div>
  );
}
export default Login;
