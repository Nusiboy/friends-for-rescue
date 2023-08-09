import { createContext, useEffect } from "react";
import { useState } from "react";
import {
  useLoadScript,
  useJsApiLoader,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
export const Context = createContext({});
const libraries = ["places", "drawing"];

function UseContext({ children }) {
  const center = { lat: 4.639539, lng: -74.10146 };
  const options = { disableDefaultUI: true, clickableIcons: false };
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });
  const [map, setMap] = useState(null);

  const [mapLoaded, setMapLoaded] = useState(false);
  const [drawingMode, setDrawingMode] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const [shapes, setShapes] = useState([]);
  const [renderpage, setRenderpage] = useState(true);

  const [hospitals, setHospitals] = useState([]);
  const [popup, setPopup] = useState(null);
  const [userPopup, setUserPopup] = useState(null);
  const [userMarker, setUserMarker] = useState([]);

  const deleteShape = async () => {
    if (selectedShape) {
      // Remove the shape from the map
      // selectedShape.setMap(null);
      setSelectedShape(null);
      setShapes((prevShapes) =>
        prevShapes.filter((shape) => shape !== selectedShape)
      );
  
      console.log(selectedShape, "selectedShape");
      axios
        .delete(`http://localhost:3000/shapes/delete/${selectedShape}`,)
        .then(() => {
          setRenderpage((prev)=>!prev)
          console.log("deleted");
        });
    }
  };

  return (
    <Context.Provider
      value={{
        center,
        options,
        isLoaded,
        loadError,
        mapLoaded,
        setMapLoaded,
        drawingMode,
        map,
        setMap,
        drawingMode,
        setDrawingMode,
        refresh,
        setRefresh,
        search,
        setSearch,
        selectedShape,
        setSelectedShape,
        shapes,
        setShapes,
        renderpage,
        setRenderpage,
        hospitals,
        setHospitals,
        popup,
        setPopup,
        userPopup,
        setUserPopup,
        userMarker,
        setUserMarker,deleteShape
      }}
    >
      {children}
    </Context.Provider>
  );
}
export default UseContext;
