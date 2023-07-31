import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/UseContext";
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";

const DrawingTools = () => {
  const {
    center,
    options,
    drawingMode,
    toggleDrawingMode,
    setMapLoaded,
    setMap,
    map,
  } = useContext(Context);

  const libraries = ["places", "drawing"];
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  const [shapes, setShapes] = useState([]);
  const [selectedShape, setSelectedShape] = useState(null);

  const saveShapeData = (shape) => {
    // Extract relevant information from the shape object
    const shapeData = {
      type: shape.type,
      // Add more properties as needed, depending on the shape type (e.g., radius for circle, paths for polyline/polygon, bounds for rectangle, etc.)
      // Example: radius: shape.getRadius(),
      // Example: paths: shape.getPaths().getArray().map((path) => path.getArray()),
    };

    // Save the shape data to your state or send it to your server for storage
    setShapes((prevShapes) => [...prevShapes, shapeData]);
  };

  useEffect(() => {
    if (isLoaded && !map) {
      const mapInstance = new window.google.maps.Map(document.getElementById("map"), {
        center: center,
        zoom: 8,
      });

      const drawingManager = new window.google.maps.drawing.DrawingManager({
        drawingMode: window.google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingControlOptions: {
          position: window.google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [
            window.google.maps.drawing.OverlayType.MARKER,
            window.google.maps.drawing.OverlayType.CIRCLE,
            window.google.maps.drawing.OverlayType.POLYGON,
            window.google.maps.drawing.OverlayType.POLYLINE,
            window.google.maps.drawing.OverlayType.RECTANGLE,
          ],
        },
        markerOptions: {
          icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
          draggable: true,
        },
        circleOptions: {
          fillColor: "#ffff00",
          fillOpacity: 1,
          strokeWeight: 5,
          clickable: true,
          editable: true,
          zIndex: 1,
        },
        polygonOptions: {
          fillColor: "#ffff00",
          fillOpacity: 1,
          strokeWeight: 5,
          clickable: true,
          editable: true,
          zIndex: 1,
        },
        polylineOptions: {
          strokeWeight: 5,
          clickable: true,
          editable: true,
          zIndex: 1,
        },
        rectangleOptions: {
          fillColor: "#ffff00",
          fillOpacity: 1,
          strokeWeight: 5,
          clickable: true,
          editable: true,
          zIndex: 1,
        },
      });

      drawingManager.setMap(mapInstance);
      setMap(mapInstance);
      setMapLoaded(true);

      window.google.maps.event.addListener(drawingManager, "overlaycomplete", (event) => {
        // Handle the creation of a new shape
        const newShape = event.overlay;
        setShapes((prevShapes) => [...prevShapes, newShape]);

        // Save the shape data
        saveShapeData(newShape);
console.log(newShape);
        // Add a click event listener to the new shape
        window.google.maps.event.addListener(newShape, "click", () => {
          setSelectedShape(newShape);
        });
      });
    } else if (map && drawingMode) {
      // Remove drawing tools from the map
      const drawingManager = map.get("drawingManager");
      if (drawingManager) {
        drawingManager.setMap(null);
      }
    }
  }, [isLoaded, map, center, drawingMode, setMap, setMapLoaded]);

  const deleteShape = () => {
    if (selectedShape) {
      // Remove the shape from the map
      selectedShape.setMap(null);
      setSelectedShape(null);

      // If you also want to remove the shape data from your state, you need to filter it out as well
      setShapes((prevShapes) => prevShapes.filter((shape) => shape !== selectedShape));
    }
  };

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {isLoaded ? (
        <>
          <button onClick={toggleDrawingMode}>
            {drawingMode ? "Disable Drawing" : "Enable Drawing"}
          </button>
          {selectedShape && (
            <div>
              <button onClick={deleteShape}>Delete Shape</button>
            </div>
          )}
          <div id="map" style={{ width: "100vw", height: "100vh" }}></div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default DrawingTools;
