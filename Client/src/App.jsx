import { Routes, Route } from "react-router-dom";
import Layout from "./compoments/layout/Layout";
import Login from "./compoments/login/Login";
import Register from "./compoments/register/Register";
import Sidebar from "./compoments/sidebar/Sidebar";
import GoogleMaps from "./compoments/googleMaps/GoogleMaps";

import "./App.css";
import GoogleMapsPolygon from "./compoments/googleMapsPolygon/GoogleMapsPolygon";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<GoogleMaps />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Sidebar" element={<Sidebar />} />
          <Route path="googlemapspolygon" element={<GoogleMapsPolygon />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
