import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/UseContext";
import { useJsApiLoader } from "@react-google-maps/api";
import Sidebar from "../sidebar/Sidebar";
const libraries = ["places", "drawing"];
const DrawingTools = () => {
  const {
    center,
    drawingMode,
    toggleDrawingMode,
    setMapLoaded,
    setMap,
    map,
  } = useContext(Context);

  
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  const [shapes, setShapes] = useState([]);
  const [selectedShape, setSelectedShape] = useState(null);
  

  const saveShapeData = (shape) => {
    let shapeCoordinates = {};
  
    if (shape instanceof google.maps.Circle) {
      const center = shape.getCenter();
      const radius = shape.getRadius();
      shapeCoordinates = {
        type: "circle",
        center: { lat: center.lat(), lng: center.lng() },
        radius: radius
      };
    } else if (shape instanceof google.maps.Polygon) {
      const path = shape.getPath().getArray();
      const coordinates = path.map((coord) => ({
        lat: coord.lat(),
        lng: coord.lng()
      }));
      shapeCoordinates = {
        type: "polygon",
        coordinates: coordinates
      };
    } else if (shape instanceof google.maps.Polyline) {
      const path = shape.getPath().getArray();
      const coordinates = path.map((coord) => ({
        lat: coord.lat(),
        lng: coord.lng()
      }));
      shapeCoordinates = {
        type: "polyline",
        coordinates: coordinates
      };
    } else if (shape instanceof google.maps.Rectangle) {
      const bounds = shape.getBounds();
      const northEast = bounds.getNorthEast();
      const southWest = bounds.getSouthWest();
      shapeCoordinates = {
        type: "rectangle",
        northEast: { lat: northEast.lat(), lng: northEast.lng() },
        southWest: { lat: southWest.lat(), lng: southWest.lng() }
      };
    } else if (shape instanceof google.maps.Marker) {
      const position = shape.getPosition();
      shapeCoordinates = {
        type: "marker",
        position: { lat: position.lat(), lng: position.lng() }
      };
    }
  
    console.log("Shape Coordinates:", shapeCoordinates);
  
    setShapes((prevShapes) => [...prevShapes, shapeCoordinates]);
  };
  
  
  useEffect(() => {
    // Log the coordinates whenever the shapes state changes
    shapes.forEach((shape) => {
      if (shape.type === "circle") {
        console.log("Circle Center:", shape.center);
        console.log("Circle Radius:", shape.radius);
      } else if (shape.type === "polygon" || shape.type === "polyline") {
        console.log("Shape Paths:", shape.paths);
      } else if (shape.type === "rectangle") {
        console.log("Rectangle Bounds:", shape.bounds);
      }
    });
  }, [shapes]);

  const updateShapeData = (shape) => {
    // Find the index of the shape in the shapes state
    const shapeIndex = shapes.findIndex((shapeData) => shapeData === shape);
  
    // If the shape is found, update its data
    if (shapeIndex !== -1) {
      const updatedShapeData = {
        ...shapes[shapeIndex],
        // Update properties specific to the shape type (e.g., center for circles, paths for polygons/polylines, etc.)
        center: shape.getCenter().toJSON(),
        paths: shape.getPath().getArray().map((latLng) => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        }),
      };
  
      // Update the shapes state with the updated shape data
      setShapes((prevShapes) => {
        const updatedShapes = [...prevShapes];
        updatedShapes[shapeIndex] = updatedShapeData;
        return updatedShapes;
      });
    }
  };

  useEffect(() => {
    if (isLoaded && !map) {
      const mapInstance = new window.google.maps.Map(
        document.getElementById("map"),
        {
          center: center,
          zoom: 8,
        }
      );
      

      const drawingManager = new window.google.maps.drawing.DrawingManager({
        drawingMode: window.google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingControlOptions: {
          position: window.google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [
            window.google.maps.drawing.OverlayType.MARKER ,
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
          fillOpacity: 0.1,
          strokeWeight: 3,
          clickable: true,
          editable: true,
          zIndex: 1,
        },
        polygonOptions: {
          fillColor: "#ffff00",
          fillOpacity: 0.1,
          strokeWeight: 3,
          clickable: true,
          editable: true,
          zIndex: 1,
        },
        polylineOptions: {
          strokeWeight: 3,
          clickable: true,
          editable: true,
          zIndex: 1,
        },
        rectangleOptions: {
          fillColor: "#ffff00",
          fillOpacity: 0.1,
          strokeWeight: 3,
          clickable: true,
          editable: true,
          zIndex: 1,
        },
      });

      drawingManager.setMap(mapInstance);
      setMap(mapInstance);
      setMapLoaded(true);

      window.google.maps.event.addListener(
        drawingManager,
        "overlaycomplete",
        (event) => {
          // Handle the creation of a new shape
          const newShape = event.overlay;
          setShapes((prevShapes) => [...prevShapes, newShape]);

          // Save the shape data
          saveShapeData(newShape);

          // Add a click event listener to the new shape
          window.google.maps.event.addListener(newShape, "click", () => {
            setSelectedShape(newShape);
          });
        }
      );
    } else if (map && drawingMode) {
      // Toggle the drawing tools based on the drawingMode state
      const drawingManager = map.get("drawingManager");
      if (drawingManager) {
        drawingManager.setOptions({ drawingControl: drawingMode });
      }
    }
  }, [isLoaded, map, center, drawingMode, setMap, setMapLoaded]);

  useEffect(() => {
    if (isLoaded && map) {
      // Add event listeners for shape editing
      shapes.forEach((shapeData) => {
        const shape = shapeData; // Get the actual shape object from the shapeData

        // Add specific event listeners based on the shape type
        if (shape.type === "circle") {
          window.google.maps.event.addListener(shape, "center_changed", () => {
            updateShapeData(shape);
          });
          window.google.maps.event.addListener(shape, "radius_changed", () => {
            updateShapeData(shape);
          });
        } else if (shape.type === "polygon" || shape.type === "polyline") {
          window.google.maps.event.addListener(shape, "set_at", () => {
            updateShapeData(shape);
          });
        } else if (shape.type === "marker") {
          window.google.maps.event.addListener(shape, "dragend", () => {
            updateShapeData(shape);
          });
        }
      });
    }
  }, [isLoaded, map, shapes]);

  const deleteShape = () => {
    if (selectedShape) {
      // Remove the shape from the map
      selectedShape.setMap(null);
      setSelectedShape(null);

      // If you also want to remove the shape data from your state, you need to filter it out as well
      setShapes((prevShapes) =>
        prevShapes.filter((shape) => shape !== selectedShape)
      );
    }
  };

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }
const hideShpes=()=>{
  drawingManager.setOptions({
    drawingControl: false
  });
  
}
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        width: "100vw",
        height: "100vh",
      }}
    >
      {isLoaded ? (
        <>
          <div id="map" style={{ width: "95vw" }}></div>
        </>
      ) : (
        <div>Loading...</div>
      )}
      <Sidebar
        drawingMode={drawingMode}
        toggleDrawingMode={toggleDrawingMode}
        deleteShape={deleteShape}
        hideShpes={hideShpes}
        selectedShape={selectedShape}
        style={{ height: "100vh" }}
      >
        {selectedShape && <div style={{ zIndex: "999" }}></div>}
      </Sidebar>
    </div>
  );
};

export default DrawingTools;
