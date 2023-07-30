import React, { useEffect, useState } from "react";
import { useLoadScript, GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import "mapbox-gl/dist/mapbox-gl.css";
import "./googleMaps.css";
import '../findPlace/FindPlace'

import usePlacesAutocomplete,{getGeocode,getLatLng} from 'use-places-autocomplete'
import{Combobox,ComboboxInput,ComboboxPopover,ComboboxList,ComboboxOption}from "@reach/combobox"

function GoogleMaps() {
   
  const center = { lat: 4.639539, lng: -74.10146 };
  const options = { disavleDefaultUI: true, clickableIcons: false };
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDfbCGZAMYlPXeslYygKG1dIMXioxz70TI",
    libraries: ["places"],
  });
  // const [query,setQuery]=useState('')
  const [mapLoaded, setMapLoaded] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [popup,setPopup]=useState(null)
  const [selected, setSelected] = useState(null);
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };
  useEffect(() => {
    if (mapLoaded) {
      searchHospitals(center);
    }
  }, [mapLoaded]);
  useEffect(() => {
    if (isLoaded && !loadError) {
      setMapLoaded(true);
    }
  }, [isLoaded, loadError]);
  const searchHospitals = (location) => {
    const request = {
      location: location,
      //   radius: , // Adjust this value to control the search area
      query: "hospital",
    };

    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    service.textSearch(request, handleTextSearch);
  };

  const handleTextSearch = (results, status) => {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      console.log(results);
      setHospitals(results);
    }
  };

  if (!mapLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="map-conteiner">
        <div className="places-container">
        <Combobox onSelect={handleSelect} >
          <ComboboxInput
            value={value}
            ey={mapLoaded ? "input-loaded" : "input-not-loaded"}
            onChange={(e) => setValue(e.target.value)}
            disabled={!ready}
            className="combobox-input"
            placeholder="Search an address"
          />
          <ComboboxPopover>
            <ComboboxList style={{backgroundColor: "#fff", border: "1px solid #ccc",cursor:"pointer"}} >
              {status === "OK" &&
                data.map(({ place_id, description }) => (
                  <ComboboxOption key={place_id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>
        {/* <FindPlace/> */}
      <GoogleMap
        options={options}
        center={center}
        zoom={10}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        
      >
        
        {hospitals.map((hospital) => {
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
                }}>
                    <div><h2>{popup.name}</h2>
                    <p>{popup.formatted_address}</p></div>
                </InfoWindow>
        )}
         {selected && <Marker position={selected} />}
      </GoogleMap>
    </div>
  );
}

export default GoogleMaps;