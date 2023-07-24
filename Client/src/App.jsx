import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Homepage from './compoments/homepage/Homepage';
import Layout from './compoments/layout/Layout';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Homepage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
