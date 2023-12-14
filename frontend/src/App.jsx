import React from 'react'
import {Routes, Route , Navigate} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home'
// auth pages
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import UserProfile from './pages/Auth/UserProfile'

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />

         {/* for user registration */}
         <Route path="/users/" element={<Register/>} />
        <Route path="/users/login" element={<Login/>} />
        <Route path="/users/profile" element={<UserProfile/>} />

      </Routes>
    </>
  )
}

export default App