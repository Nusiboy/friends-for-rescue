import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../login/Login.css";
import { useNavigate } from "react-router-dom";
import { RefreshContext } from "../../context/RefreshContext";
function Login() {
  const [userNameValue, setUserNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [refresh, setRefresh] = useState();
  const { ref, setRef } = useContext(RefreshContext);
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
      })
      .then((user) => {
        localStorage.setItem("user-token", user.data.token);
        localStorage.setItem("LoginName", userNameValue);
        localStorage.setItem("usernum", phoneValue);
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
          <input className="login-input"
            type="text"
            name="username"
            placeholder="Username"
            onChange={(event) => {
              setUserNameValue(event.target.value);
            }}
          />
          <br />
          <input className="login-input"
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
      </div>
  );
}
export default Login;
