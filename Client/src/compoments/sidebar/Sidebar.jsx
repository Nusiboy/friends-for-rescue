import React, { useContext, useState, useEffect } from "react";
import { RefContext } from "../../context/RefreshConmtext";
import { Context } from "../../context/UseContext";
import "./Sidebar.css";
import axios from "axios";
import Chat from "../Chat/Chat";
import Sharelocaition from "../sharelocation/Sharelocaition";
import DisplayData from "../datalayer/DisplayData";

function Sidebar({deleteShape,selectedShape,toggleDrawingMode,drawingMode,hideShpes,setSearh}) {
  // const { toggleDrawingMode } = useContext(Context);
   const { currentUser, setCurrentUser } = useContext(RefContext);
const [inputSearch,setInputSearh]=useState('')
const [updateOrigin, setUpdateOrigin] = useState("");

  const [updateMobility, setUpdateMobility] = useState("");
  const [updateMedical, setUpdateMedical] = useState("");
  const [user, setUser] = useState([]);
  const [show, setShow] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showPractices, setShowPractices] = useState(false);

  console.log(localStorage.getItem("type") == "admin");

  function renderWelcomeButton() {
    if (localStorage.getItem("type") == "user") {
      setShow((prev) => !prev);
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
          className="update-input"
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
          className="update-input"
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
          className="update-input"
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
        <button id="update-btn" type="submit" onClick={() => updateUser()}>
          Update User
        </button>
      </div>
    );
  }
  function ChatOpener() {
    return (
      <div id="comunication-container">
        <Sharelocaition />
        <Chat />
      </div>
    );
  }
  function SearchOpener(){
    return(
      <div id="search-container">
        <input id="search-input-container" type="text" onChange={(e)=>{setInputSearh(e.target.value)}} />
        <button className="search-btns" onClick={()=>{setSearh(inputSearch)}}>search</button>
        <button className="search-btns" onClick={hideShpes}> hide</button>
      </div>
      )
  }
  return (
    <div id="sidebar-container">
      <div id="sidebar-layers-container">
        <button className="layer-btn" onClick={toggleDrawingMode}>
          {drawingMode ? <img className="sidebar-icons" src="data:image/png;base64,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"/> : <img className="sidebar-icons" src="data:image/png;base64,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"/>}
        </button>
        {selectedShape && (
          <div>
            <button className="layer-btn" onClick={deleteShape}>
              Delete Shape
            </button>
          </div>
        )}
        <button onClick={toggleDrawingMode} className="layer-btn">
        <img className="sidebar-icons" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFF0lEQVR4nO2cS2sVSRTH/4maGxWU+QYafMVEXcx16UZm4UKTTfAjKApxoQu3uhGfmRvzYpjdrAU1qPj+AiI+8phRBEFdKUSNMQtNzHDgNIRLbt3urup69flBQchN31Sf03UedU4XIAiCIAiCIAiCEB/dAIYATAP4DmAOwCSAGn8mFMRaACMAfgFYajAWAAwDaCtqEmUW/kOF4OvHI1GCWUYyCD8ZZKYEA3Q1MTsqc0TXCppczSH8ZAzo/vMy08JRzRsNBUy4vonQ6ABwBMA/AD5oCD4Zs4iQXQAGOfamGPwrgJcALmeMw5MnvB/ANQAfDQi8fswgIioARgEsNnF8AwDaHQm8fjxBRMJ/nOHGb/M1tgW+kgnqRQSM5bj5eQcCX2lQCHsWQCsCtvkqs2NjzBv4jnEAGxEggw4E/hXAAwCnAfzO5mzcwPe+DjE5m7Ig8E/sJ/rZb5DDrqfCkdaCAeUG5RdmCxD4xxQCb8ROABcBPAfwBcBn/pl+tzflSiG/cCYUv/DNscCz0srCTbN/NM5KuwTgBSvUu/qCjgl6Y0Hgjehlc6Pz4HhRX9Bxwn+6nDiAHQD+M7CCndYXunKGoYssANdsNBRBOa0vDAX49Nf7hbM56wrLzZGzELaS0Z7e5Wt8o1czqnNWX/gjg9mpNdiM84UnIdYXbiomNcfb0TVPbH4zZkKrL2xSZJ+TjkJMHXT2lehhs84VxYSOIjymNRRAD5xV1nOqv9JkZvjz0BjWUADlRFY5ppgMpe8hsjtnXrPA+1DWaFFsQ9BkNqNcjV5XfQo9byBs2nl7Ia3w77vIa1Tp+36ETzuvhGZNBoMuhN+hmNhEgKGnih6FAg7CEQOKSVHjVExUFfdKn1lnnSJbDDX0DEoBxxUTorJfbFR9U8BEpKGntwrYzZ5+ivc6Gk3mOuKk6koBaXo9Yws9vVFA1l7PLxG/+FZ1oYDRDMJPxgXESdW2AvL2etI1Ww38/+28xf2Md1pd9+FYV4BOm8moRlq+hsNY397zta4AnYJEshLecvMsta2f4nS+U6Gc1QDuedqHY10BJloN0yrnJCtn2OM+HOsKKKLZtoixYKkP55BiDvTwBNluvmRoDDjejl5kv0dHJRij5oFglxz34WQtyDw22evUbeAlB1tjFv7kQXSNMfI6xR52rGPsaN8W/P7YHMyzRyMPohzKCG0Zj3+5A2BVg++qcAjawyGpSeVMelKQX/4QwqQShpqYIxLgOY7j81AB8LdnfTj/asyHAhjjdHG0McE5AlW9nnLWusVhH84vXlk+tSbSEWlBMupRH858GQ//qGTc/qZxuKC5TJf1+JtKisRn+XhZwGuk2wC8L/sBUN3s/KfYpqpuuM9wp5/OuwHWe0Nt0WdhFVCnx08N4TvpjLZFKwu6iFWwWjPuT8YDrmdES18Bq+A3FpyO4JPe0KiFX8QqIGf7KoWA6W8OcL07OXviG0c7V2K1+XlWwWSGVbCPT19JY1ZolQhMCz+FOquAGod/pBD+X2UwKzZXAW0Unk9p00/kmllJaMmxCjYAuJVC+DOcCwgaq2CJHeULfknwQAZnS45ZMLAK8sTw4mwzctiQ8Ec0ahmlZlhT8OJsNejULGWKs3VwOFQy3omzdVswoWsFTZrVCFSDyo2Cw95VOlZNcNi7GnTN1hdqGgqgLWTBUe9qtDXbUBKxQdeTjom2jL2r0ddsXdCWone1NDVbl3TV9a6WtmYrCIIgCIIgCAK85H8cYs3oJV7O2AAAAABJRU5ErkJggg=="/>
        </button>
        <button id="chat-btn" onClick={() => setShowChat((prev) => !prev)}>
        <img className="sidebar-icons" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAACF0lEQVR4nO2cS05bURBEaxCyk0iQLJLMGGAcks2ghCUwA1bBiJ8S/hU96Q0yCRLytaobnyPVGHdV3277YV8JAAAAAAAAAADg/3yW9E3SuaRbSd5w3c5eLGdv1saWpO+SngoU7aJ6mj2avBrKB0lHBQp0E/0aHcKiQFFupsNR5n+S9FCgIDfTo6SdEQHsFSjGTXUwIoCTAoW4qc5GBHBRoBA31fWIAH4XKMSNRQAigHgXmhOQN8KMoLwZDmhl/hQowo1FACKAeBeaE5A3woygvBkOiB2g5gHcFegiNxYBiADiXWhOQN4IM4LyZjggdoCaB3BfoIvcWAQgAoh3oTkBeSPMCMqb4YDYAWoeAF9LFAG4wCjhBChvJiNIeUPZAeollrCaB/BYoAg3FgGIAOJdaE5A3ggzgvJmOCB2gJoHwC/jRQAuMEo4AcqbyQhS3lB2gHqJJazmATwX6CI3FgGIAOJdaE5A3ggzgvJmOCB2gJoH8FKgi9xYK3NZoAg31dWIAE4LFOJNvrLsoEAhbqr9EQFM1/HyPwG92fzp2yTbGsSPAt3kZprukh7GdA3vcYGi3EQ/13F/9Mf5JDCO9OrYWa7D/H/5Mv+RacPfFOg2h3Uze7EYdVXxaFYpbjf94t8DmB+Gzg/D2AnDzA/Dwg3Du50wvNUMw/v8MHzICsMn3DA8XgjDs50wPFgLw1PNMF/TLwAAAEAF+QtnSjMv5aIwcwAAAABJRU5ErkJggg=="/>
        </button>
        {showChat && <ChatOpener />}
          <button
            className="layer-btn"
            onClick={() => setShowPractices((prev) => !prev)}
          >
           <img className="sidebar-icons" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAABYUlEQVR4nO3aQW6DQAwFUB8kXUa5exXlZpVKLuAqUrKYbCoQrQG/J7FspvxfF5gQAQAAAAAA0NNHRFwj4h4ROfN4/MwtIi7VJ7Hn8L8WBP9+PD7jVH0ye3RdIfzX8Vl9Mnt0X7GAqfpk9ihXPphJAcUUUEwBxRRQTAHFFFBMAcUUUEwBxRRQTAHF+/MKKN6fV0Dx/rwCivfnFVAciALeKKBYmgAFZOevJNMEKCBNQLgL8i8oXAPSc4CLcLoLCk/CbkOj9jngyPvz+c/rzXb0/fncegFH35/PrRdw9P353HoBRw8kFTBSQLNA0gSMFNAskDQBIwU0CyRNwEgBzQJJEzBSQLNA0gSMFNAskDQBIwU0CyRNwEgBzQJJEzBSQLNA0gSMFNAskDQBIwU0CyRNwEgBf/hi1nf87ujrzXZb8Re8Wm++y4ov556tt8zp+WLttCD46fmXf7YeAAAAAAAQDfwAOHMKwThJimwAAAAASUVORK5CYII="/>
          </button>
          {showPractices && <DisplayData showPractices={showPractices} />}
        {localStorage.getItem("type") == "user" && (
          <button id="edit-btn" onClick={() => renderWelcomeButton()}>
              <img className="sidebar-icons" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAACuElEQVR4nO2dS2oVQRhGPwM+NpKJ4iacFXjdRQaKU2dZgq8YYwRdhwiKi1CzDVEjaOPjl4a6IE176Ud1fX91fQdqFm66z6lb1bfTSQCxBDcAnAH4DOAEwOVFvovoJQD4DsD+Ga8BXOn/cpFa/o+OfEVwIF8RHMhXhIXYB9AMlL8dr7Qxp+XeyADamBfgcEKEp0scSM0cjgzwiX3AJXILwBGACwkivM987KuQ30R5pzMjNPETs5hxqfkCwN6EjbmJMZNwPb4lPwL4NmEjMsL4A+DOxJnfHWPfCe3rbFKIb28wPQPw24FQI8kfGyGp/HcOZJoD+UMjJF12TiuQv5nwCff5jgjtJ+Zka/7al53NBPlDIiThqED5dxe6sfa/8XLH1dFszhxINYczvzuOlwpw7kCsOZ3525F0w+3CFms1y4cDuVazfDgQbDXLhwPJVrN8OBBtNcuHA9lWs3w4EG41y4cD6VazfAw4OI+EtcgvMUBYk/zSAoS1yS8pQOh5Srl4+aUECGuVX0KAmwlvKTfx9YYy5tb3KgME4sw/iJfG1QYIDuRbrQGCE/lVBgiO5FcZoCFtuLd75FcZwJzMfAVAPvm7notanDW9A5qRyw52zHwFwLIzH/GJN/oEpB9AhxzLzhYF6CGX/BYF6CGX/BYF6CGX/BYF6CGX/BYFIKMAZBSAjAKQUQAyCkBGAcgoABkFIKMAZBSAjAKQ2fPw8xD6ARBRADIKQEYByCgAGQUgowBkFICMApBRADIKQEYByCgAGQUgowBkFICMiwBfZ/5a0JrHlxwBSvrTxZZ5fMgR4JGDEzWn436OANcA/HJwsuZstE6uIhPHDk7YnI3HyMglAG8dnLQ5GW8AXMwZYBvhSeXL0c8487PL7+4JD+MVQCn/W8BmjPN4rg9yrvlCCCGEEEIIIYQQAsXzF9ViWlQErw7bAAAAAElFTkSuQmCC" />
          </button>
        )}
        {show && <EditUser />}
            <button className="layer-btn" onClick={() => setShowSearch((prev) => !prev)}>
            <img className="sidebar-icons" src="data:image/png;base64,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"/>
            </button>
            {showSearch && <SearchOpener />}
      </div>
    </div>
  );
}
export default Sidebar;
