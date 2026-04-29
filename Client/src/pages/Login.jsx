import axios from 'axios';
import React, { useState } from 'react'
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';
import { toast } from 'react-toastify'
function Login() {
    const {userData,setUserData,setToken} = useAuth();
    const[loginData,setLoginData] = useState({
        email:"",
        password:""
    })

    const navigate = useNavigate()
    const hadleInput=(e)=>{

        const name = e.target.name;
        const value  = e.target.value;

        setLoginData({
            ...loginData,
            [name]:value
        })
    }

    const handleLoginForm = async(e)=>{
        e.preventDefault();
        // console.log(userData)
        
          try {
            const response = await axios.post(
              "http://localhost:2000/api/auth/login",
              loginData
            );
            //  console.log(response.data)   
          if(response.status===200)
          {
            const token = response.data.token
            // console.log(token)
            localStorage.setItem("token",token)
            setToken(token)
            setUserData(userData);
            toast.success("login successfully")
            // alert("login success")
            navigate("/myprofile")
          }
          
          } catch (error) {
            console.log(error)
            alert(error.response?.data?.message || "Login failed");
          }
        
                
    }
  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[rgba(7,129,135,0.98)] via-[rgba(24,153,144,1)] to-[rgba(111,237,233,1)]">

    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">

    <form className="flex flex-col gap-4" onSubmit={handleLoginForm}>

      <h2 className="text-xl font-bold text-center">Login</h2>

      <input
        type="email"
        name="email"
        placeholder="User ID"
        required
        value={loginData.email}
        onChange={hadleInput}
        className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        value={loginData.password}
        onChange={hadleInput}
        className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        type="submit"
        className="bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition"
      >
        Login
      </button>

    </form>

    <p className="text-center text-sm mt-4">
      Don’t have an account?{" "}
      <NavLink to="/register" className="text-blue-600 hover:underline">
        Sign Up
      </NavLink>
    </p>

  </div>

</div>
  )
}

export default Login