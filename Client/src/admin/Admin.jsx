import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Admin() {

    const[pass,setPass]=useState('')
    const password = "147ad";
    const navigate = useNavigate();
    const handleAdmin = (e)=>{
        e.preventDefault();
        if(pass==password)
        {
            localStorage.setItem("isAdmin","true")
           navigate("/admin/user") 
        }
        else{
            window.alert("invalid credential")
        }
    }
   

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-cyan-500 to-blue-600">
  <form onSubmit={handleAdmin}
  className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
    
    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
      Admin Login
    </h2>

    <div className="mb-4">
      <input
        type="password"
        placeholder="Enter password"
        value={pass}
        onChange={(e)=>setPass(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
    >
      Login
    </button>

  </form>
</div>
  )
}

export default Admin