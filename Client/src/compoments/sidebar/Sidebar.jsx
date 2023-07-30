import React, { useContext, useState, useEffect } from "react";
import { ContextUser } from "../../context/ContextUser";
import "./Sidebar.css";
import axios from "axios";
// import Chat from "../Chat/Chat";
// import Sharelocaition from "../sharelocation/Sharelocaition";

function Sidebar() {
  const { currentUser, setCurrentUser } = useContext(ContextUser);
  const [updateOrigin, setUpdateOrigin] = useState("");
  const [updateMobility, setUpdateMobility] = useState("");
  const [updateMedical, setUpdateMedical] = useState("");
  const [user, setUser] = useState([]);
  const [show, setShow] = useState(false);
  // const [showChat, setShowChat] = useState(false);

  function renderWelcomeButton() {
    return <div id="user-sidebar">{currentUser || "User"}</div>;
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
// function ChatOpener(){
//   return(
// <div id="comunication-container">
// <Chat />
// <Sharelocaition />
// </div>
//   )
// }
  function EditUser() {
    return (
      <div id="update-user-container">
        <select id="update-origin-select"
          name="updateOrigin"
          onChange={(event) => {
            setUpdateOrigin(event.target.value);
          }}
          value={updateOrigin}
        >
          <option value="Local">Local</option>
          <option value="Israeli">Israeli</option>
        </select>
        <br />
        <select id="update-mobility-select"
          name="updateMobility"
          onChange={(event) => {
            setUpdateMobility(event.target.value);
          }}
          value={updateMobility}
        >
          <option value="Pedestrian">Pedestrian</option>
          <option value="Mobile">Mobile</option>
        </select>
        <br />
        <select id="update-medical-select"
          name="updateMedical"
          onChange={(event) => {
            setUpdateMedical(event.target.value);
          }}
          value={updateMedical}
        >
          <option value="None">None</option>
          <option value="Medic">Medic</option>
          <option value="Paramedic">Paramedic</option>
          <option value="Doctor">Doctor</option>
        </select>
        <br />
        <button id="update-btn" type="submit" onClick={updateUser}>
          Update User
        </button>
      </div>
    );
  }
  console.log(currentUser);
  return (
    <div id="sidebar-container">
      <div id="sidebar-layers-container">
        <button className="layer-btn">layer</button>
        <button className="layer-btn">layer</button>
        <button className="layer-btn">layer</button>
      </div>
      <div>
        <button  id="sidebar-user-name" onClick={() => setShow((prev) => !prev)}>
          {localStorage.getItem("user-token") &&
            localStorage.getItem("LoginName") &&
            renderWelcomeButton()}
        </button>
        {show && <EditUser />}
      </div>
      {/* <button id="chat-btn" onClick={() => setShowChat((prev) => !prev)}>
        Chat
      </button>
      {showChat && <ChatOpener />} */}
    </div>
  );
}
export default Sidebar;
