import { Routes, Route } from 'react-router-dom';
import Layout from './compoments/layout/Layout';
import Login from './compoments/login/Login';
import Register from './compoments/register/Register';
import Map from './compoments/map/Map';
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Map />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
