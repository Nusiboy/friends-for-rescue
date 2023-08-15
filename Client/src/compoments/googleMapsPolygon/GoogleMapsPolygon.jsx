import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/UseContext";
import { useJsApiLoader, GoogleMap, Marker, InfoWindow  } from "@react-google-maps/api";
import Sidebar from "../sidebar/Sidebar";
import axios from "axios";


const libraries = ["places", "drawing"];

const DrawingTools = () => {
  const {
    center,
    options,
    drawingMode,
    toggleDrawingMode,
    setMapLoaded,
    setMap,
    map,hospitals,
    setHospitals,
    popup,
    setPopup,
    userPopup,
    setUserPopup,
    userMarker,
    setUserMarker,selectedShape, setSelectedShape
  } = useContext(Context);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  const [shapes, setShapes] = useState([]);
  const [renderpage,setRenderpage]=useState(true)
  const [prevshapes, setPrevShapes] = useState([]);
 

  const saveShapeData = async (shape) => {
    console.log(shape);
    let shapeCoordinates = {};

    if (shape instanceof google.maps.Circle) {
      console.log("circle");
      const center = shape.getCenter();
      const radius = shape.getRadius();
      shapeCoordinates = {
        type: "circle",
        center: { lat: center.lat(), lng: center.lng() },
        radius: radius,
      };
    } else if (shape instanceof google.maps.Polygon) {
      console.log("Polygon");
      const path = shape.getPath().getArray();
      const coordinates = path.map((coord) => ({
        lat: coord.lat(),
        lng: coord.lng(),
      }));
      shapeCoordinates = {
        type: "polygon",
        coordinates: coordinates,
      };
    } else if (shape instanceof google.maps.Polyline) {
      console.log("Polyline");
      const path = shape.getPath().getArray();
      const coordinates = path.map((coord) => ({
        lat: coord.lat(),
        lng: coord.lng(),
      }));
      shapeCoordinates = {
        type: "polyline",
        coordinates: coordinates,
      };
    } else if (shape instanceof google.maps.Rectangle) {
      console.log("Rectangle");
      const bounds = shape.getBounds();

      console.log(bounds);
      const northEast = bounds.getNorthEast();
      const southWest = bounds.getSouthWest();
      shapeCoordinates = {
        type: "rectangle",
        northEast: { lat: northEast.lat(), lng: northEast.lng() },
        southWest: { lat: southWest.lat(), lng: southWest.lng() },
      };
    } else if (shape instanceof google.maps.Marker) {
      console.log("Marker");
      const position = shape.getPosition();
      shapeCoordinates = {
        type: "Marker",
        position: { lat: position.lat(), lng: position.lng() },
      };
    }
    console.log(shapeCoordinates);

    try {
      await axios.post("http://localhost:3000/shapes/add", shapeCoordinates);

      setShapes((prevShapes) => [...prevShapes, shapeCoordinates]);
    } catch (err) {
      console.error("Error saving shape data:", err);
    }

    console.log("Shape Coordinates:", shapeCoordinates);

    // setShapes((prevShapes) => [...prevShapes, shapeCoordinates]);
  };

  const updateShapeData = (shape) => {
    // Find the index of the shape in the shapes state
    const shapeIndex = shapes.findIndex((shapeData) => shapeData === shape);

    // If the shape is found, update its data
    if (shapeIndex !== -1) {
      const updatedShapeData = {
        ...shapes[shapeIndex],
        // Update properties specific to the shape type (e.g., center for circles, paths for polygons/polylines, etc.)
        // center: shape.getCenter().toJSON(),
        //  paths: shape.getPaths().getArray().map((path) => path.getArray()),
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
      

      async function takeshapes() {
        try {
          let data = await axios.get("http://localhost:3000/shapes/take");
          console.log(data.data);
          for (let shape of data.data) {
            console.log(shape.northEast);
            switch (shape.type) {
              case "circle":
                console.log(shape.center);
                const newCircle = new google.maps.Circle({
                  center: shape.center,

                  radius: Number(shape.radius),
                  strokeColor: "#FF0000",
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: "#FF0000",
                  fillOpacity: 0.35,
                  clickable: true,
                });
                console.log(newCircle);
                newCircle.addListener("click", () => {
                  console.log(newCircle);
                  setSelectedShape(shape._id);
                });
                newCircle.setMap(mapInstance);
                break;
              case "rectangle":
                let newbounds = {
                  north: shape.northEast.latitude,
                  south: shape.southWest.latitude,
                  east: shape.northEast.longitude,
                  west: shape.southWest.longitude,
                };

                console.log();
                console.log(newbounds);
                
                const newRectangle = new google.maps.Rectangle({
                  bounds: newbounds,
                  strokeColor: "#FF0000",
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: "#FF0000",
                  fillOpacity: 0.35,
                });
                newRectangle.addListener("click", () => {
                  console.log(newRectangle);
                  setSelectedShape(shape._id);
                });
                newRectangle.setMap(mapInstance);
                break;
              case "polyline":
                let polylineData = shape.coordinates.map((item) => {
                  return item;
                });
                const newPolyline = new google.maps.Polyline({
                  path: polylineData,
                  strokeColor: "#FF0000",
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: "#FF0000",
                  fillOpacity: 0.35,
                  clickable: true,
                 
                });
                newPolyline.addListener("click", () => {
                  console.log(newPolyline);
                  setSelectedShape(shape._id);
                });
                newPolyline.setMap(mapInstance);
                break;
              case "polygon":
                let polygonData = shape.coordinates.map((item) => {
                  return item;
                });
                const newPolygon = new google.maps.Polygon({
                  path: polygonData,
                  strokeColor: "#FF0000",
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: "#FF0000",
                  fillOpacity: 0.35,
                  clickable: true,
                });
                newPolygon.addListener("click", () => {
                  console.log(newPolygon);
                  setSelectedShape(shape._id);
                });
                newPolygon.setMap(mapInstance);

                break;
              case "Marker":
                const newMarker = new google.maps.Marker({
                  position: {
                    lat: Number(shape.latitude),
                    lng: Number(shape.longitude),
                  },
                  icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
                  draggable: true,
                });
                newMarker.setMap(mapInstance);
                newMarker.addListener("click", () => {
                  console.log(newMarker);
                  setSelectedShape(shape._id);
                });
                break;
              default:
                console.log("fuck");

                break;
            }
          }
          // }
        } catch (err) {
          console.error("Error saving shape data:", err);
        }
      }
      takeshapes();

      const drawingManager = new window.google.maps.drawing.DrawingManager({
        // drawingMode: window.google.maps.drawing.OverlayType.MARKER,
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
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
          clickable: true,
        },
        polygonOptions: {
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
          clickable: true,
        },
        polylineOptions: {
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
          clickable: true,
        },
        rectangleOptions: {
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
          clickable: true,
        },
      });

      drawingManager.setOptions({
        drawingControl: !drawingMode,
      });

      drawingManager.setMap(mapInstance);
      // setMap(mapInstance);
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
            console.log(newShape);
            setSelectedShape(newShape);
          });
        }
      );
    }
  }, [isLoaded, map, center, setMap, setMapLoaded, drawingMode,renderpage]);
  
  console.log(selectedShape);
  console.log(drawingMode);
  console.log(isLoaded, "isLoaded");
  console.log(!map, "Map");
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
            console.log(shape);
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

  // const deleteShape = async () => {
  //   if (selectedShape) {
  //     // Remove the shape from the map
  //     // selectedShape.setMap(null);
  //     setSelectedShape(null);
  //     setShapes((prevShapes) =>
  //       prevShapes.filter((shape) => shape !== selectedShape)
  //     );
  
  //     console.log(selectedShape, "selectedShape");
  //     axios
  //       .delete(`http://localhost:3000/shapes/delete/${selectedShape}`,)
  //       .then(() => {
  //         setRenderpage((prev)=>!prev)
  //         console.log("deleted");
  //       });
  //   }
  // };

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {isLoaded ? (
        <>
        
          {/* {selectedShape &&(
          <div style={{zIndex:"999",display:"flex",justifyContent:"center",width:100,margin:0,position:"fixed"} }>
              <button style={{zIndex:999,width:100,margin:0}} onClick={deleteShape}>Delete Shape</button>
              </div>
          )} */}
          <div id="map" style={{ width: "100vw", height: "100vh" }}></div>
          {/* <GoogleMap id="map" center={center} zoom={8}  style={{ width: "100vw", height: "100vh" }}>
            
          </GoogleMap> */}
          
        </>
      ) : (
        <div>Loading...</div>
      )}
      {/* <Sidebar style={{ width: "10vw", height: "100vh" }} /> */}
    </div>
  );
};

export default DrawingTools;
