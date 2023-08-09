import { createContext, useEffect } from "react";
import { useState } from "react";
import { useLoadScript, useJsApiLoader ,GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
export const Context=createContext({})
const libraries = ["places","drawing"];
function UseContext({children}){
    const center = { lat: 4.639539, lng: -74.10146 };
    const options = { disableDefaultUI: true, clickableIcons: false };
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
        libraries:libraries,
      });
      const [map, setMap] = useState(null)

      const [mapLoaded, setMapLoaded] = useState(false);
      const [drawingMode, setDrawingMode] = useState(true);
      const [refresh, setRefresh] = useState(false);
      
//   const toggleDrawingMode = () => {
//     setDrawingMode((prevState) => !prevState);
//   };
// useEffect(()=>{
//     if(drawingMode==false)
//     setDrawingMode(!drawingMode)
// }
// ,[drawingMode])
        return(
            <Context.Provider value={{center,options,isLoaded, loadError,mapLoaded, setMapLoaded,drawingMode,map, setMap,drawingMode, setDrawingMode,refresh,setRefresh }}>
                {children}
            </Context.Provider>
        )
}
export default UseContext