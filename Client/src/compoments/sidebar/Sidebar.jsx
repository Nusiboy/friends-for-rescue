import React, { useContext, useState, useEffect } from "react";
import { RefContext } from '../../context/RefreshConmtext';
import { Context } from "../../context/UseContext";
import "./Sidebar.css";
import axios from "axios";
import Chat from "../Chat/Chat";
import Sharelocaition from "../sharelocation/Sharelocaition";



function Sidebar({deleteShape,selectedShape,toggleDrawingMode,hideShpes,setSearch}) {
  // const { toggleDrawingMode } = useContext(Context);
   const { currentUser, setCurrentUser } = useContext(RefContext);
   const{setDrawingMode,drawingMode,refresh,setRefresh}=useContext(Context)
const [inputSearch,setInputSearh]=useState('')
 const [updateOrigin, setUpdateOrigin] = useState("");
  const [updateMobility, setUpdateMobility] = useState("");
  const [updateMedical, setUpdateMedical] = useState("");
  const [user, setUser] = useState([]);
  const [show, setShow] = useState(false);
  const [showChat, setShowChat] = useState(false);
  

  function renderWelcomeButton() {
    // const firstLetter = currentUser.charAt(0);
    // console.log(currentUser);
    // return (
    //   <button id="sidebar-user-name" onClick={() =>{
        if (localStorage.getItem("type")=="user") {
          setShow((prev) => !prev)
        }
        console.log("open");
     
  }
 
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
          value={updateMobility}s
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
        <input type="text" onChange={(e)=>{setInputSearh(e.target.value)}} />
        <button onClick={()=>{setSearch(inputSearch)}}>search</button>
        <button onClick={()=>{setSearch("")}} >clean</button>
        <button onClick={()=>{
          setDrawingMode(!drawingMode)
          console.log(drawingMode)
          setRefresh(!refresh)}} className="layer-btn">  {drawingMode ? "Show" : "Hide"}</button>
          <button 
                className="layer-btn"
                onClick={toggleDrawingMode}
              >
               
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
