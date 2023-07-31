import React, { useContext, useState, useEffect } from "react";
import { ContextUser } from "../../context/ContextUser";
import "./Sidebar.css";
import axios from "axios";

function Sidebar() {
  const { currentUser, setCurrentUser } = useContext(ContextUser);
  const [updateOrigin, setUpdateOrigin] = useState("");
  const [updateMobility, setUpdateMobility] = useState("");
  const [updateMedical, setUpdateMedical] = useState("");
  const [user, setUser] = useState([]);
  const [show, setShow] = useState(false);

  function renderWelcomeButton() {
    const firstLetter = currentUser.charAt(0);
    return (
      <button id="sidebar-user-name" onClick={() => setShow((prev) => !prev)}>
        {firstLetter}
      </button>
    );
  }
  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then(({ data }) => setUser(data))
      .catch((err) => console.log(err.response.data));
  }, []);
  async function updateUser() {
    try {
      const user = await axios.patch(`http://localhost:3001/users/updateUser`, {
        origin: updateOrigin,
        mobility: updateMobility,
        medical: updateMedical,
        token: localStorage.getItem("user-token"),
      });
      alert("User has been updated!");
    } catch (err) {
      console.log(err.response.data);
    }
  }
  function EditUser() {
    return (
      <div id="update-user-container">
        <select
          id="update-origin-select"
          name="updateOrigin"
          onChange={(event) => {
            setUpdateOrigin(event.target.value);
          }}
          value={updateOrigin}
        >
          <option className="edit-options" default selected disabled>
            Origin
          </option>
          <option className="edit-options" value="Local">
            Local
          </option>
          <option className="edit-options" value="Israeli">
            Israeli
          </option>
        </select>
        <br />
        <select
          id="update-mobility-select"
          name="updateMobility"
          onChange={(event) => {
            setUpdateMobility(event.target.value);
          }}
          value={updateMobility}
        >
          <option className="edit-options" default selected disabled>
            Mobility
          </option>
          <option className="edit-options" value="Pedestrian">
            Pedestrian
          </option>
          <option className="edit-options" value="Mobile">
            Mobile
          </option>
        </select>
        <br />
        <select
          id="update-medical-select"
          name="updateMedical"
          onChange={(event) => {
            setUpdateMedical(event.target.value);
          }}
          value={updateMedical}
        >
          <option className="edit-options" default selected disabled>
            Medical Experience
          </option>
          <option className="edit-options" value="None">
            None
          </option>
          <option className="edit-options" value="Medic">
            Medic
          </option>
          <option className="edit-options" value="Paramedic">
            Paramedic
          </option>
          <option className="edit-options" value="Doctor">
            Doctor
          </option>
        </select>
        <br />
        <button id="update-btn" type="submit" onClick={updateUser}>
          Update User
        </button>
      </div>
    );
  }
  return (
    <div id="sidebar-container">
      <div id="sidebar-layers-container">
        <button className="layer-btn">layer</button>
        <button className="layer-btn">layer</button>
        <button className="layer-btn">layer</button>
      </div>
      <div>
        {localStorage.getItem("user-token") && renderWelcomeButton()}
        {show && <EditUser />}
      </div>
    </div>
  );
}
export default Sidebar;
