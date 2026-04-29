import React from 'react'
import {useState} from "react"
import axios from "axios"
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify'
function Register() {

    const [userData,setUserData] = useState({
        first_name:"",
        last_name:"",
        email:"",
        password:"",
        phone:"",
        gender:""
    });

    const handleInput = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
    
        setUserData({
            ...userData,
            [name]:value
        })
      }
    const handleRegisterForm = async(e)=>{
        e.preventDefault();
        // console.log(userData)
        try {
          const response = await axios.post(
            "http://localhost:2000/api/auth/register",
            userData
          );
          toast.success("Register successfully")
          console.log("Success:", response.data);
          setUserData({
          first_name:"",
          last_name:"",
          email:"",
          password:"",
          phone:"",
          gender:""
          })
        } catch (error) {
            const message = error.response?.data?.msg || "Registration failed";console.error("Error:", message);
            toast.error(message)
        }
    }
  return (
   
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[rgba(7,129,135,0.98)] via-[rgba(24,153,144,1)] to-[rgba(111,237,233,1)]">

    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">

    <form className="flex flex-col gap-4" onSubmit={handleRegisterForm}>

      <h2 className="text-xl text-white font-bold text-center">Register</h2>

      <input
        type="text"
        name="first_name"
        placeholder="First Name"
        required
        value={userData.first_name}
        onChange={handleInput}
        className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        value={userData.last_name}
        onChange={handleInput}
        className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        value={userData.email}
        onChange={handleInput}
        className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        value={userData.password}
        onChange={handleInput}
        className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="number"
        name="phone"
        placeholder="Phone"
        required
        value={userData.phone}
        onChange={handleInput}
        className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <select
        name="gender"
        value={userData.gender}
        onChange={handleInput}
        className="border rounded-lg p-2  focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <button
        type="submit"
        className="bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-800 transition"
      >
        Register
      </button>

    </form>

    <p className="text-center text-sm mt-4 ">
      Already have an account?{" "}
      <NavLink to="/login" className="text-blue-600 hover:underline">
        Login
      </NavLink>
    </p>

  </div>

</div>
  )
}

export default Register