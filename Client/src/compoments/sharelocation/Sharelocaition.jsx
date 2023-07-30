import axios from 'axios';
import React, { useState } from 'react'
import "../Chat/Chat.css"

function Sharelocaition() {
    const [found,setFound]=useState()
    const [coordinates,setCoordinates]=useState()
    const [photourl,setPhotourl]=useState("")
    function takelocation() {
        if (found) {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
              // Success callback
              function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                console.log({latitude:`${latitude}`,longitude:`${longitude}`,found:`${found}`,img:`${latitude}`});
                setCoordinates({latitude:`${latitude}`,longitude:`${longitude}`,found:`${photourl}`});
                
              },
              // Error callback
              function(error) {
                console.error("Error getting user location:", error.message);
              }
            );
          } else {
            console.error("Geolocation is not supported in this browser.");
          }
        }
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
    <div id='sharelocation-container'>
        <input id='file-input-container' onChange={(e) => onchange(e)} type="file" />
      <div id='description-send-container'>  <textarea id='description-input-container' onChange={(e)=>setFound(e.target.value)} placeholder=' what did you find' type="text" />
        <button id='location-send-btn' onClick={()=>takelocation()}>take location</button>
    </div>
    </div>
  )
}
export default Sharelocaition