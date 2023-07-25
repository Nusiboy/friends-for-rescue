import React, {useState, useEffect} from 'react'
import axios from "axios";
import '../login/Login.css'
import { useNavigate } from "react-router-dom";
  
function Login() {
  const [userNameValue, setUserNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [refresh, setRefresh] = useState();
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then(({ data }) => setUser(data))
      .catch((err) => console.log(err.message));
  }, [refresh]);
  function login() {
    axios
    .post("http://localhost:3001/users/login", {
      userName: userNameValue,
      email: emailValue,
      password: passwordValue,
      phone: phoneValue,
    })
    .then((user) => {
      localStorage.setItem("user-token", user.data.token);
      navigate("/Map");
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
      });
  }
  return (
 <div>
   <div id="login-register-container">
      <div id="login-container">
        <h1>Login</h1>
        <input
          type="text"
          name="username"
          placeholder='Username'
          onChange={(event) => {
            setUserNameValue(event.target.value);
          }}
        />
        <br />
        <input
          type="text"
          name="email"
          placeholder='Email'
          onChange={(event) => {
            setEmailValue(event.target.value);
          }}
        />
        <br />
        <input
          type="text"
          name="password"
          placeholder='Password'
          onChange={(event) => {
            setPasswordValue(event.target.value);
          }}
        />
        <br />
        <input
          type="number"
          name="phone"
          placeholder='Phone number'
          onChange={(event) => {
            setPhoneValue(event.target.value);
          }}
        />
        <br />
        <button id="login-btn" type="sumbit" onClick={login}>
          login
        </button>
      </div>
    </div>
    <div id='admin-login-container'>
    </div>
  </div>
  )
}
export default Login