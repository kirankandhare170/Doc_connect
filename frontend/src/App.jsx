import React from 'react'



import { Routes, Route} from "react-router-dom"
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointment from './pages/MyAppointment'
import Appointment from './pages/Appointment'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Register from './pages/Register'
import VerifyOtp from './pages/VerifyOtp'
import ForgotPassword from "./pages/ForgotPassword";
import VerifyResetOtp from "./pages/VerifyResetOtp";
import ResetPassword from "./pages/ResetPassword"; 
import { ToastContainer } from 'react-toastify';
const App = () => {
  return (
    <>
      
      
    
    <div  className='mx-4 sm:mx-[10%]'>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Home />} />
             
             <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verify-reset-otp" element={<VerifyResetOtp />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            <Route path='/doctors' element = {< Doctors/>}></Route>
            <Route path='/doctors/:speciality' element = {<Doctors/>}></Route>
            <Route path='/login' element = { <Login/>}></Route>
            <Route path='/about' element = { <About/>}></Route>
            <Route path='/contact' element = { <Contact/>}></Route>
            <Route path='/my-profile' element = {<MyProfile/>}></Route>
            <Route path='/my-appointments' element = {<MyAppointment/>}></Route>
            <Route path='/appointment/:docId' element = {<Appointment/>}></Route>
            <Route path='/register' element = { <Register/>}></Route>
            <Route path="/verify-otp" element={<VerifyOtp />} />
        </Routes>
       <Footer/>
   </div>
   <ToastContainer />
    </>
  )
}

export default App