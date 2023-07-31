import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import UseContext from './context/UseContext.jsx'
import RefreshContext from './context/RefreshConmtext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <UseContext>
      <RefreshContext>
    <App />
    </RefreshContext>
    </UseContext>
    </BrowserRouter>
  </React.StrictMode>
)