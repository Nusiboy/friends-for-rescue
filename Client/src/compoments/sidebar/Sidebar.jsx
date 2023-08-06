import React, { useContext, useState, useEffect } from "react";
import { RefContext } from '../../context/RefreshConmtext';
import { Context } from "../../context/UseContext";
import "./Sidebar.css";
import axios from "axios";
import Chat from "../Chat/Chat";
import Sharelocaition from "../sharelocation/Sharelocaition";

function Sidebar({deleteShape,selectedShape,toggleDrawingMode,drawingMode,hideShpes}) {
  const { currentUser, setCurrentUser } = useContext(RefContext);
  const [updateOrigin, setUpdateOrigin] = useState("");
  const [updateMobility, setUpdateMobility] = useState("");
  const [updateMedical, setUpdateMedical] = useState("");
  const [user, setUser] = useState([]);
  const [show, setShow] = useState(false);
  const [showChat, setShowChat] = useState(false);
  
console.log(localStorage.getItem("type")=="admin");

  function renderWelcomeButton() {
    // const firstLetter = currentUser.charAt(0);
    // console.log(currentUser);
    // return (
    //   <button id="sidebar-user-name" onClick={() =>{
        if (localStorage.getItem("type")=="user") {
          setShow((prev) => !prev)
        }
        console.log("open");
      // }}>
      //   {firstLetter}
      // </button>
    // );
  }
  // useEffect(() => {
  //   console.log(localStorage.getItem("user-token"));
    
  //   axios
  //     .post("http://localhost:3001/users",{id:localStorage.getItem("user-token")}).then(({ data }) =>{
  //       setUpdateOrigin(data.info.origin)
  //       setUpdateMobility(data.info.mobility)
  //       setUpdateMedical(data.info.medical)
  //   })
  //     .then(({ data }) => setUser(data))
  //     .catch((err) => console.log(err.response.data));
  // }, []);
  async function updateUser() {
    console.log("sendreq");
    try {
      const user = await axios.patch(`http://localhost:3000/users/edit`, {
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
          <option className="edit-options" default disabled>
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
          <option className="edit-options" default disabled>
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
          <option className="edit-options" default disabled>
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
        <button id="update-btn" type="submit" onClick={()=>updateUser()}>
          Update User
        </button>
      </div>
    );
  }
  function ChatOpener(){
    return(
  <div id="comunication-container">
  <Sharelocaition />
  <Chat />
  </div>
    )
  }
  return (
    <div id="sidebar-container">
      <div id="sidebar-layers-container">
        
        <button className="layer-btn">layer</button>
        <button onClick={hideShpes} className="layer-btn"> hide</button>
          <button
                className="layer-btn"
                onClick={toggleDrawingMode}
              >
                {drawingMode ? "Disable Drawing" : "Enable Drawing"}
              </button>
        
        {selectedShape && (
          <div>
<button className="layer-btn" onClick={deleteShape}>Delete Shape</button>
          </div>
        )}
        <button  onClick={toggleDrawingMode} className="layer-btn">polygon</button>
        <button className="layer-btn">layer</button>
        <button id="chat-btn" onClick={() => setShowChat((prev) => !prev)}>
        Chat
      </button>
      {showChat && <ChatOpener />}
        
      </div>
      <div>
        {localStorage.getItem("type")=="user"&&<button onClick={()=>renderWelcomeButton() }>edit</button>}
        {show && <EditUser />}
      </div>
      
    </div>
  );
}
export default Sidebar;
