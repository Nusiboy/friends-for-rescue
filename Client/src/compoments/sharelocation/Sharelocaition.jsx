import axios from "axios";
import React, { useState, useEffect } from "react";
import "../Chat/Chat.css";

function Sharelocaition() {
  const [refresh, setRefresh] = useState();
  const [user, setUser] = useState([]);
  const [found, setFound] = useState();
  const [coordinates, setCoordinates] = useState();
  const [photourl, setPhotourl] = useState("");
  const [mark, setMark] = useState(
    "Police Station",
    "Beit Chabad",
    "Hospital",
    "Israeli Embassy",
    "Camping Site",
    "Hiking Trail",
    "Other"
  );
  function takelocation() {
    if (found) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log({
              latitude: `${latitude}`,
              longitude: `${longitude}`,
              found: `${found}`,
              img: `${latitude}`,
            });
            setCoordinates({
              latitude: `${latitude}`,
              longitude: `${longitude}`,
              found: `${photourl}`,
              information: `${found}`,
              markType: `${mark}`,
            });
          },
          function (error) {
            console.error("Error getting user location:", error.message);
          }
        );
      } else {
        console.error("Geolocation is not supported in this browser.");
      }
    }
  }
  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then(({ data }) => setUser(data))
      .catch((err) => console.log(err.message));
  }, [refresh]);

  async function Mark() {
    try {
      const user = await axios.post(
        `http://localhost:3001/users/markLocation`,
        {
          token: localStorage.getItem("user-token"),
          longitude: coordinates.longitude,
          latitude: coordinates.latitude,
          markType: mark,
          found: photourl,
          information: found,
        }
      );
      alert("Mark has been placed!");
    } catch (err) {
      console.log(err.response.data);
    }
  }
  function sendInfo() {
    Mark();
    takelocation();
  }

  async function onchange(e) {
    const imageUrl = e.target.files[0];
    if (imageUrl) {
      const formData = new FormData();
      formData.append("file", imageUrl);
      formData.append("upload_preset", "b5w6nssf");
      await axios
        .post(
          "https://api.cloudinary.com/v1_1/dbhkoyzin/image/upload",
          formData
        )
        .then((res) => setPhotourl(res.data.secure_url));
    }
  }
  console.log(coordinates);
  console.log(photourl);
  return (
    <div id="sharelocation-container">
      <h1>Location Updater</h1>
      <input
        id="file-input-container"
        onChange={(e) => onchange(e)}
        type="file"
      />
      <div id="description-send-container">
        <textarea
          id="description-input-container"
          onChange={(e) => setFound(e.target.value)}
          placeholder=" what did you find"
          type="text"
        />
        <select
          name="locationType"
          id="mark-type-select"
          value={mark}
          onChange={(event) => {
            setMark(event.target.value);
          }}
        >
          <option value="" disabled hidden>
            Mark type:
          </option>
          <option value="Police Station">Police Station</option>
          <option value="Beit Chabad">Beit Chabad</option>
          <option value="Hospital">Hospital</option>
          <option value="Israeli Embassy">Israeli Embassy</option>
          <option value="Camping Site">Camping Site</option>
          <option value="Hiking Trail">Hiking Trail</option>
          <option value="Other">Other</option>
        </select>
        <button id="location-send-btn" onClick={() => sendInfo()}>
          take location
        </button>
      </div>
    </div>
  );
}
export default Sharelocaition;
