import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { useContext } from "react";
import { Context } from "../../context/UseContext";
import "mapbox-gl/dist/mapbox-gl.css";
import "./googleMaps.css";
import "../findPlace/FindPlace";
import Sidebar from "../sidebar/Sidebar";
import GoogleMapsPolygon from "../googleMapsPolygon/GoogleMapsPolygon";
import axios from "axios";

function GoogleMaps() {
  const {
    center,
    options,
    isLoaded,
    loadError,
    mapLoaded,
    setMapLoaded,
    map,
    setMap,
    search,
    setSearch,
  } = useContext(Context);
  // const [search, setSearch] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [popup, setPopup] = useState(null);
  const [userPopup, setUserPopup] = useState(null);
  const [userMarker, setUserMarker] = useState([]);
  // const [selected, setSelected] = useState(null);
  const [drawnPolygons, setDrawnPolygons] = useState([]);
  const handlePolygonDrawn = (newPolygon) => {
    setDrawnPolygons([...drawnPolygons, newPolygon]);
  };

  useEffect(() => {
    async function TakeMarks() {
      try {
        let data = await axios.get("http://localhost:3000/marks/take");
        console.log(data);
        setUserMarker(data);
      } catch (err) {
        console.log(err.response.data);
      }
    }

    TakeMarks();
  }, []);
  // async function deleteMark(props){
  //   console.log(props);
  //   let x= JSON.parse(props._id)
  //   console.log(x);
  //   try {
  //     await axios.delete("http://localhost:3000/marks/delete",{x});
  //     console.log("deleted");
  //   } catch (err) {
  //     console.log(err.response.data);
  //   }
  // }
  async function deleteMark(props) {
    console.log(props);

    try {
      await axios.delete("http://localhost:3000/marks/delete", { data: props });
      console.log("deleted");
    } catch (err) {
      console.log(err.response.data);
    }
  }

  useEffect(() => {
    if (map) {
      searchHospitals(center);
    }
  }, [search]);
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
      query: search,
      keyword: search,
      // openNow:true,
      // type:["hospital"]
    };

    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    service.nearbySearch(request, handleTextSearch);
  };

  const handleTextSearch = (results, status) => {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      // console.log(results);
      // console.log(
      //   results.map((value, index) => {
      //     return value.geometry;
      //   })
      // );
      setHospitals(results);
    }
  };

  if (!map) {
    return <div>Loading...</div>;
  }

  // console.log(map);
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
          {userMarker?.data?.map((marker) => {
            return (
              <Marker
                key={marker?._id}
                position={{
                  lat: parseFloat(marker.latitude),
                  lng: parseFloat(marker.longitude),
                }}
                onClick={() => {
                  // e.originalEvent.stopPropagation();
                  setUserPopup(marker);
                }}
              />
            );
          })}

          {hospitals.map((hospital) => {
            // console.log(hospital);
            return (
              <Marker
                key={hospital.place_id}
                icon={{
                  url: hospital.icon,
                  scaledSize: new window.google.maps.Size(25, 25),
                }}
                position={{
                  lat: hospital.geometry.location.lat(),
                  lng: hospital.geometry.location.lng(),
                }}
                onClick={() => {
                  // e.originalEvent.stopPropagation();
                  setPopup(hospital);
                }}
              />
            );
          })}
          {userPopup && (
            <InfoWindow
              position={{
                lat: parseFloat(userPopup?.latitude),
                lng: parseFloat(userPopup?.longitude),
              }}
              onCloseClick={() => {
                console.log(userPopup);
                setUserPopup(null);
              }}
            >
              <div>
                <h1 style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "24px",
                    margin: "0",
                    paddingBottom: "4px",
                    color: '#555'
                  }}>{userPopup.username}</h1>
                <p style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",margin: "0",
                    paddingBottom: "4px",
                    color: '#555'
                  }}>{userPopup.markType}</p>
                <p style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",margin: "0",
                    paddingBottom: "4px",
                    color: '#555'
                  }}>{userPopup.information}</p>
                <img
                  height={20}
                  width={20}
                  src={userPopup.found}
                  alt={userPopup.information}
                />
                <button  style={{
        marginTop: "10px",
        padding: "6px 12px",
        fontSize: "16px",
        backgroundColor: "ActiveBorder",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}  onClick={() => deleteMark(userPopup)}>delete</button>
              </div>
            </InfoWindow>
          )}
          {popup && (
            <InfoWindow
            
              position={{
                lat: popup.geometry.location.lat(),
                lng: popup.geometry.location.lng(),
              }}
              onCloseClick={() => {
                setPopup(null);
                console.log(popup);
              }}
            >
              <div
                style={{
                  backgroundColor: "#fff",
                  padding: "20px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  textAlign: "center",
                }}
              >
                <h2
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "24px",
                    margin: "0",
                    paddingBottom: "4px",
                    color: '#555'
                  }}
                >
                  {popup.name}
                </h2>
                <p>{popup.formatted_address}</p>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",margin: "0",
                    paddingBottom: "4px",
                    color: '#555'
                  }}
                >
                  <h3>Address: </h3>
                  <h4>{popup.vicinity}</h4>{" "}
                </p>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",margin: "0",
                    paddingBottom: "4px",
                    color: '#555'
                  }}
                >
                  <h4>rating:</h4>
                  {<h5>{popup.rating}</h5>}
                </p>
                {popup.photos && (
                  <img
                    style={{ width: 200, height: 150, borderRadius: '4px', boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", }}
                    src={popup.photos[0].getUrl()}
                    alt=""
                  />
                )}
              </div>
            </InfoWindow>
          )}

          {/* {selected && <Marker position={selected} />} */}
        </GoogleMap>
      </div>

      {/* <Sidebar setSearch={setSearch} /> */}
    </div>
  );
}

export default GoogleMaps;
