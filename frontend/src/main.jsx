import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";

import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './store/Auth.jsx'


const CLIENT_ID ="39773617898-96akhoghaebjit96evp2itppmjln6csd.apps.googleusercontent.com";
createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    
    <AuthProvider>
        <GoogleOAuthProvider clientId={CLIENT_ID}>

       <App />
       </GoogleOAuthProvider>
 </AuthProvider>
 
    </BrowserRouter>
)
  
