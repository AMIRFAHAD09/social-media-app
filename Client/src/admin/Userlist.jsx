import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import {toast} from "react-toastify"
function Userlist() {
     const[userlist,setUserlist]=useState([])

    const getUserList = async()=>{
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/users`);

            setUserlist(res.data);
            // console.log(userlist)
        } catch (error) {
            console.log("user not found")
        }
    }
   

    //delete users
    const handleDelete = async(id)=>{
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/users/delete/${id}`)
            toast.success("user delete")
            // setUserlist(prev=>prev.filter(p =>p._id!== id))
        } catch (error) {
            console.log(error)
        }
    }
     useEffect(()=>{
        getUserList();
    },[handleDelete])
    // console.log(userlist)
  return (
 <div className="min-h-screen bg-gray-100 p-6">
      
      {/* Heading */}
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Admin Dashboard - Users
      </h1>

      {/* Table Container */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        
        {/* Table Header */}
        <div className="grid grid-cols-5 bg-gray-200 px-6 py-3 font-semibold text-gray-700">
          <p>Name</p>
          <p>Username</p>
          <p>Gender</p>
          <p>Date</p>
          <p>Action</p>
        </div>

        {/* User List */}
        {userlist.map((curEle) => (
          <div
            key={curEle._id}
            className="grid grid-cols-5 px-6 py-4 border-t items-center hover:bg-gray-50 transition"
          >
            <p>{curEle.first_name}</p>
            <p>{curEle.username}</p>
            
            <p className="capitalize">{curEle.gender}</p>
            <p>{curEle.createdAt?.slice(0,10)}</p>
            <button 
            onClick={()=>handleDelete(curEle._id)}
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition w-fit">
              Delete
            </button>
          </div>
        ))}

      </div>

    </div>

  );
}


export default Userlist
