import './App.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from "react-toastify"

import StartPage from './Pages/StartPage'
import UserLogin from './Pages/UserLogin'
import UserSignup from './Pages/UserSignup'
import Home from './Pages/Home'
import UserLogout from './Pages/UserLogout'
import UserProtectWrapper from './Pages/UserProtectWrapper'
import Riding from './Pages/Riding'

import CaptainLogin from './Pages/CaptainLogin'
import CaptainSignup from './Pages/CaptainSignup'
import CaptainHome from './Pages/CaptainHome'
import CaptainLogout from './Pages/CaptainLogout'
import CaptainProtectWrapper from './Pages/CaptainProtectWrapper'
import CaptainRiding from './Pages/CaptainRiding'

const App = () => {
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/riding" element={<Riding />} />
        <Route path="/signup" element={<UserSignup />} />
        
        <Route path="/home" element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
        } />  
        
        <Route path='/logout' element={
          <UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
        } />
        
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-riding" element={<CaptainRiding />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        
        <Route path="/captain-home" element={
          <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>
        } />
        
        <Route path="/captain-logout" element={
          <CaptainProtectWrapper>
            <CaptainLogout />
          </CaptainProtectWrapper>
        } />
      
      </Routes>
    </>
  )
}

export default App
