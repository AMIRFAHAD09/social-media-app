import React from 'react'
import { NavLink } from 'react-router-dom'
import "./home.css"
function Home() {
  return (
<div className="min-h-screen flex items-center justify-center overflow-x-hidden
bg-gradient-to-r from-[#165669] via-[#090979] to-[#0e869e] text-white">

  {/* Card */}
  <div className="w-[90%] max-w-sm bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 flex flex-col items-center">

    {/* Logo */}
    <img 
      src="images/logo.png" 
      alt="Logo"
      className="w-20 h-20 mb-4 rounded-full"
    />

    {/* Title */}
    <h2 className="text-2xl font-bold mb-8 text-center">
      Social Media App
    </h2>

    {/* Buttons */}
    <div className="w-full flex flex-col gap-4">
      
      <NavLink 
        to="/register"
        className="w-full text-center py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition font-medium"
      >
        Sign Up
      </NavLink>

      <NavLink 
        to="/login"
        className="w-full text-center py-3 rounded-xl border border-white hover:bg-white hover:text-gray-900 transition font-medium"
      >
        Login
      </NavLink>

    </div>

  </div>

</div>

  )
}

export default Home