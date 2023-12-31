import React, { useState, useEffect } from "react";
import Map from "react-map-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "./homePage.css";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import Sidebar from "../sidebar/Sidebar";
import Chat from "../Chat/Chat";
import Sharelocaition from "../sharelocation/Sharelocaition";


mapboxgl.accessToken =
  "pk.eyJ1IjoiYXZzaGEiLCJhIjoiY2xraTIzdnJ1MDRscjNxbWd6M3Vzdm1zeCJ9.clUun8yz9QaQrKAkL2y-sA";

function Homepage() {
  const [viewport, setViewport] = useState({
    latitude: 4.639539,
    longitude: -74.10146,
    width: "100vw",
    height: "100vh",
    zoom: 10,
  });
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/outdoors-v12",

      center: [viewport.longitude, viewport.latitude],
      zoom: viewport.zoom,
    });

    new mapboxgl.Marker()
      .setLngLat([-74.10146, 4.639539])
      .addTo(map);


    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        line_string: true,
        point: true,
        trash: true,
      },
      defaultMode: "draw_polygon",
    });
    map.addControl(draw);


    map.on("draw.create", () => {
      const geojson = draw.getAll().features[0];
      console.log(geojson.geometry.coordinates[0]);
    });

    map.on("draw.update", () => {
      const geojson = draw.getAll().features[0];
      console.log(geojson.geometry.coordinates[0]);
    });

    return () => map.remove();
  }, []); 


  const mapContainerRef = React.useRef();

  function ChatOpener(){
    return(
  <div id="comunication-container">
  <Sharelocaition />
  <Chat />
  </div>
    )
  }
  return (
    <>

      <div ref={mapContainerRef} style={{ position: "absolute", top: 0, bottom: 0, width: "100%", height: "100%" }}></div>

      <div className="calculation-box">
        <p>Click the map to draw a polygon.</p>
        <div id="calculated-area"></div>
      </div>
        <button id="chat-btn" onClick={() => setShowChat((prev) => !prev)}>
          Chat
        </button>
        {showChat && <ChatOpener />}
      <Sidebar />
    </>
  );
}
export default Homepage;
