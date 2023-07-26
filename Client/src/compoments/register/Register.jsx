import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [registerUserNameValue, setRegisterUserNameValue] = useState("");
    const [registerEmailValue, setRegisterEmailValue] = useState("");
    const [registerPasswordValue, setRegisterPasswordValue] = useState("");
    const [registerPhoneValue, setRegisterPhoneValue] = useState("");
    const [registerOrigin, setRegisterOrigin] = useState("Local", "Israeli")
    const [registerMobility, setRegisterMobility] = useState("Pedestrian", "Mobile")
    const [registerMedical, setRegisterMedical] = useState("none", "Medic", "Paramedic", "Doctor")
    const [refresh, setRefresh] = useState();
    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
          .get("http://localhost:3001/users")
          .then(({ data }) => setUser(data))
          .catch((err) => console.log(err.message));
      }, [refresh]);

      async function registerUser() {
        try {
          const user = await axios.post("http://localhost:3001/users/register", {
            userName: registerUserNameValue,
            email: registerEmailValue,
            password: registerPasswordValue,
            phone: registerPhoneValue,
            info: {
            origin: registerOrigin,
            mobility: registerMobility,
            medical: registerMedical
        }
          })
          .then((user) => {
            navigate("/");
          })
          alert("User have been created!")
        } catch (err) {
          console.log(err);
        }
      }
  return (
    <div id="register-container">
    <h1>Register</h1>
    <input
      type="text"
      name="registerUsername"
      placeholder='Username'
      onChange={(event) => {
        setRegisterUserNameValue(event.target.value);
      }}
    />
    <br />
    <input
      type="text"
      name="registerEmail"
      placeholder='Email'
      onChange={(event) => {
        setRegisterEmailValue(event.target.value);
      }}
    />
    <br />
    <input
      type="text"
      name="registerPassword"
      placeholder='Password'
      onChange={(event) => {
        setRegisterPasswordValue(event.target.value);
      }}
    />
    <br />
    <input
      type="text"
      name="registerPhone"
      placeholder='Phone number'
      onChange={(event) => {
        setRegisterPhoneValue(event.target.value);
      }}
    />
    <br />
    <select
  name="registerOrigin"
  placeholder="Origin"
  onChange={(event) => {
    setRegisterOrigin(event.target.value);
  }}
>
  <option value="" disabled selected hidden>Origin</option>
  <option value="Local">Local</option>
  <option value="Israeli">Israeli</option>
</select>
<br />
<select
  name="registerMobility"
  placeholder="Mobility"
  onChange={(event) => {
    setRegisterMobility(event.target.value);
  }}
>
  <option value="" disabled selected hidden>Mobility</option>
  <option value="Pedestrian">Pedestrian</option>
  <option value="Mobile">Mobile</option>
</select>
<br />
<select
  name="registerMedical"
  placeholder="Medical Experience"
  onChange={(event) => {
    setRegisterMedical(event.target.value);
  }}
>
  <option value="" disabled selected hidden>Medical Experience</option>
  <option value="None">None</option>
  <option value="Medic">Medic</option>
  <option value="Paramedic">Paramedic</option>
  <option value="Doctor">Doctor</option>
</select>
    <br />
    <button id="login-btn" type="sumbit" onClick={registerUser}>
      register
    </button>
  </div>
  )
}

export default Register