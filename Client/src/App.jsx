import { Routes, Route } from 'react-router-dom';
import Layout from './compoments/layout/Layout';
import Maps from  './compoments/maps/maps';
import Login from './compoments/login/Login';
import Register from './compoments/register/Register';
import Sidebar from './compoments/sidebar/Sidebar';
import Homepage from './compoments/homepage/Homepage';
import GoogleMaps from './compoments/googleMaps/GoogleMaps';

import "./App.css"
import GoogleMapsPolygon from './compoments/googleMapsPolygon/GoogleMapsPolygon';

function App() {
  

  return (
    <>
   
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Sidebar' element={<Sidebar />} />

          <Route path='map' element={<Maps/>} />
          <Route path='googlemaps' element={<GoogleMaps/>} />
<Route path='googlemapspolygon' element={<GoogleMapsPolygon/>}/>
          <Route path='/map' element={<Map/>} />

        </Route>
      </Routes>
      
    </>
  )
}

export default App
