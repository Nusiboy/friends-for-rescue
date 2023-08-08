import React, { useCallback, useEffect, useState } from "react";
import {  GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { useContext } from "react";
import { Context } from "../../context/UseContext";
import "mapbox-gl/dist/mapbox-gl.css";
import "./googleMaps.css";
import '../findPlace/FindPlace'
import Sidebar from "../sidebar/Sidebar";
import GoogleMapsPolygon from "../googleMapsPolygon/GoogleMapsPolygon";




function GoogleMaps() {
   const{center,options,isLoaded, loadError,mapLoaded, setMapLoaded,map, setMap }=useContext(Context)
const [search,setSearh]=useState('')
  const [hospitals, setHospitals] = useState([]);
  const [popup,setPopup]=useState(null)
  // const [selected, setSelected] = useState(null);
  const [drawnPolygons, setDrawnPolygons] = useState([]);
  const handlePolygonDrawn = (newPolygon) => {
    setDrawnPolygons([...drawnPolygons, newPolygon]);
  };
 

  

  useEffect(() => {
    if (map) {
      searchHospitals(center);
    }
  }, [map]);
  useEffect(() => {
    if (isLoaded && !loadError) {
      console.log("hi");
      setMap(true);
    }
  }, [isLoaded, loadError]);
  const searchHospitals = (location) => {
    const request = {
      location: location,
        radius: 10000, // Adjust this value to control the search area
      query: {search:search.toString()},
      keyword:{search:search.toString()},
      openNow:true, 
      // type:["hospital"]
    };

    const service = new window.google.maps.places.PlacesService(
      document.createElement("div") 
    );
    service.nearbySearch(request, handleTextSearch);
  

  };

  const handleTextSearch = (results, status) => {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      console.log(results);
      console.log(results.map((value,index)=>{
        return value.geometry
      }))
      setHospitals(results);
    }
  };

  if (!map) {
    return <div>Loading...</div>;
  }

console.log(map)
  return (
    <div>
    <div className="map-conteiner">
       {/* <GoogleMapsPolygon onPolygonDrawn={handlePolygonDrawn}/>  */}
       
      <GoogleMap
        options={options}
        center={center}
        zoom={10}
        mapContainerStyle={{ width: "100vw", height: "90vh" }}
        
      >
        
        {hospitals.map((hospital) => {
          console.log(hospital);
          return (
           
            <Marker
              key={hospital.place_id}
              icon={{url: hospital.icon, scaledSize: new window.google.maps.Size(25,25)}}
              
              position={{
                lat: hospital.geometry.location.lat(),
                lng: hospital.geometry.location.lng(),
              }}
              
              onClick={()=>{
                // e.originalEvent.stopPropagation();
                setPopup(hospital)
              }}
            />
          );
        })}
        {popup&&(
            <InfoWindow position={{lat: popup.geometry.location.lat(),
                lng: popup.geometry.location.lng(),}}
                onCloseClick={()=>{
                    setPopup(null)
                    console.log(popup);
                }}>
                    <div><h2>{popup.name}</h2>
                    <p>{popup.formatted_address}</p></div>
                </InfoWindow>
        )}
         {/* {selected && <Marker position={selected} />} */}
      </GoogleMap>
    </div>
    
      {/* <Sidebar setSearh={setSearh}/> */}
    
    </div>
  );
}

export default GoogleMaps;