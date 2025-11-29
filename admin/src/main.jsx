import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom';
import AdminContextProvider, { AdminContext } from './contex/Admincontex.jsx';
import AppContextProvider from './contex/Appcontex.jsx';
import DoctorContextProvider from './contex/doctorContex.jsx';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AdminContextProvider>
    <DoctorContextProvider>
      <AppContextProvider>
          <App />
      </AppContextProvider>
    </DoctorContextProvider>
  </AdminContextProvider>
   
  </BrowserRouter>,
)
