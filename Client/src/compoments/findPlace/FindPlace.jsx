import { useRef, useState } from "react";
import React from "react";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";

function FindPlace() {
  const inputRef = useRef();
  const [inputValue, setInputValue] = useState("");

  const handlePlaceChanged = () => {
    
  };

  const handleClick = () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      console.log(place.formatted_address);
      console.log(place.geometry.location.lat());
      console.log(place.geometry.location.lng());
    }
  };

  return (
    <div>
      <LoadScript
        googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"
        libraries={["places"]}
      />
      <StandaloneSearchBox
        onLoad={(ref) => (inputRef.current = ref)}
        onPlacesChanged={handlePlaceChanged}
      >
        <input
          style={{
            width: "300px",
            height: "40px",
            fontSize: "16px",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            outline: "none",
            zIndex:'999'
          }}
          type="text"
          className="form-control"
          placeholder="enter location"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </StandaloneSearchBox>
      <button onClick={handleClick}>Get Input Value</button>
    </div>
  );
}

export default FindPlace;
