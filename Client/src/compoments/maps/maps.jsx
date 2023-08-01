import React, { useState } from "react";
import ReactMapGL, { Marker, NavigationControl, Popup } from "react-map-gl";
import data from "../../../hospital.json";
import "./map.css";
import "mapbox-gl/dist/mapbox-gl.css";
const MAPBOX_TOKEN =
  "pk.eyJ1IjoiYXZzaGEiLCJhIjoiY2xraTIzdnJ1MDRscjNxbWd6M3Vzdm1zeCJ9.clUun8yz9QaQrKAkL2y-sA";

function Maps() {
  const [viewportt, setViewportt] = useState({
    latitude: 4.639539,
    longitude: -74.10146,
    width: "100vw",
    height: "100vh",
    zoom: 10,
  });
  const [showPopup, setShowPopup] = useState(null);

  return (
    <div className="map-conteiner">
      <ReactMapGL
        initialViewState={viewportt}
        onViewportChange={(viewport) => setViewportt(viewport)}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
      >
        <NavigationControl />
        {data &&
          data.features.map((value, index) => (
            <Marker
              key={index}
              rotationAlignment="map"
              longitude={value.geometry.coordinates[0]}
              latitude={value.geometry.coordinates[1]}
              color="red"
              
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setShowPopup(value);
                
              }}
            ></Marker>
          ))}
        {showPopup && (
          <Popup
          anchor="top"

            longitude={showPopup.geometry.coordinates[0]}
            latitude={showPopup.geometry.coordinates[1]}
            onClose={() => setShowPopup(null)}
          >
            {showPopup.type}
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}

export default Maps;
