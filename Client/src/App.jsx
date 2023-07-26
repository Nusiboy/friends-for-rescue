import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Layout from './compoments/layout/Layout';
import Login from './compoments/login/Login';
import Register from './compoments/register/Register';
import Map from './compoments/map/Map';
import Sidebar from './compoments/sidebar/Sidebar';
import { ContextUser } from './context/ContextUser';
import { RefreshContext } from './context/RefreshContext';
function App() {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("LoginName"))
  const [refresh, setRefresh] = useState(false)

  return (
    <>
    <ContextUser.Provider value={{currentUser, setCurrentUser}}>
    <RefreshContext.Provider value={ {ref:refresh ,  setRef: setRefresh}}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Map />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Sidebar' element={<Sidebar />} />
        </Route>
      </Routes>
      </RefreshContext.Provider>
      </ContextUser.Provider>
    </>
  )
}

export default App
