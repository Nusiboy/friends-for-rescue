import { Routes, Route } from 'react-router-dom';
import Login from './compoments/login/Login';
import Layout from './compoments/layout/Layout';
import Map from './compoments/map/Map';
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Login />} />
          <Route path='/Map' element={<Map />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
