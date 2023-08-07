import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../login/Login.css";
import { useNavigate } from "react-router-dom";
import Register from "../register/Register";
// const [emailValue, setEmailValue] = useState("");
import { RefContext } from "../../context/RefreshConmtext";

function Login() {
  const [userNameValue, setUserNameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  // const [refresh, setRefresh] = useState();
  const { ref, setRef } = useContext(RefContext);
  // const [user, setUser] = useState([]);
  const navigate = useNavigate();
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/users")
  //     .then(({ data }) => setUser(data))
  //     .catch((err) => console.log(err.message));
  // }, [refresh]);
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
        <button id="login-btn" type="sumbit" onClick={loginUser}>
          login
        </button>
      </div>
      <div>
        <Link to={"/Register"}>
          Haven't signed to our services? click to sign! 
        </Link>
      </div>
    </div>
  );
}
export default Login;
