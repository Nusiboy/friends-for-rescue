import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Layout from './compoments/layout/Layout';
import Maps from  './compoments/maps/maps';
import Login from './compoments/login/Login';
import Register from './compoments/register/Register';
import Sidebar from './compoments/sidebar/Sidebar';
import Homepage from './compoments/homepage/Homepage';
import { ContextUser } from './context/ContextUser';
import { RefreshContext } from './context/RefreshContext';

import Homepage from './compoments/homepage/Homepage';
import GoogleMaps from './compoments/googleMaps/GoogleMaps';

import "./App.css"

function App() {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("LoginName"))
  const [refresh, setRefresh] = useState(false)

  return (
    <>
    <ContextUser.Provider value={{currentUser, setCurrentUser}}>
    <RefreshContext.Provider value={ {ref:refresh ,  setRef: setRefresh}}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Sidebar' element={<Sidebar />} />

          <Route path='map' element={<Maps/>} />
          <Route path='googlemaps' element={<GoogleMaps/>} />

          <Route path='/map' element={<Map/>} />

        </Route>
      </Routes>
      </RefreshContext.Provider>
      </ContextUser.Provider>
    </>
  )
}

export default App
