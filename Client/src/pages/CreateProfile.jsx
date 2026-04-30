import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import "./profile.css"
import { FaUser } from "react-icons/fa6";
import axios from 'axios';
import { useAuth } from './authContext';
import { toast } from 'react-toastify'
function Profile() {
 
  const navigate = useNavigate()
  const {token,userData,setUserData} = useAuth();
  const[image,setImage] = useState("")
//update profile
  const[profileData,setProfileData] = useState({username:"",image:"",dob:"",bio:""})
  const handleImageChange = async(e) => {
    const file = e.target.files[0];

    const data = new FormData();
    data.append("file",file)
    data.append("upload_preset","Social Media app")
    // data.append("cloud_name","dilexvciy")

    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/dilexvciy/image/upload",data)
      // console.log(res.data.url)
      const imageUrl = res.data.url
      setImage(imageUrl)

      setProfileData((prev) => ({
        ...prev,
        image: imageUrl
      }));
    } catch (error) {
      console.log("error when upload image",error)
    }
    
   
  };

  
  // console.log(data)

  
  useEffect(() => {
    if (userData) {
      setProfileData({
        username: userData.username || "",
        image: userData.image || "",
        dob: userData?userData.dob.split("T")[0]:"",
        bio: userData.bio || ""
      });
  
      setImage(userData.image || "");
    }
  }, [userData]);


  const handleInput = (e)=>{
    const name = e.target.name;
    const value = e.target.value;

    setProfileData({
        ...profileData,
        [name]:value
    })
  }

  const handleNextForm = async(e)=>{
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:2000/api/auth/updateProfile",profileData
       ,
        {
          headers: {
            Authorization: token
          }
        }
        
      );
      // setUserData(res.data)
      navigate("/Post")
      console.log(res.data)
    } catch (error) {
      const message = error.response?.data?.msg || "update failed";console.error("Error:", message);
      toast.error(message)
    }
  }

  //skip the profile creation page
  const handleSkip = ()=>{
    navigate('/myprofile')
  }
  return (
    <div className='bg-cyan-600 h-screen flex items-center justify-center '>
    <div className='flex flex-col h-150 w-300 p-6 max-w-md mx-auto bg-white'>
      <h2 className='text-xl font-bold mb-4'>Complete your profile</h2>
        <form className='w-full flex flex-col gap-4'>
            <input 
              className='pic' 
              type="file" 
              name="photo" 
              id="photo"
              onChange={handleImageChange} 
              hidden/>
              <label htmlFor="photo" className='w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden mx-auto'>
                {
                  image?(
                    <img src={image}  className="w-full h-full object-cover"/>
                  ):<FaUser className='w-24 h-24 rounded-full p-4 bg-gray-200 text-gray-500'/>
                }
              </label>
             <h2 className="text-blue-600 font-semibold text-center capitalize">{userData?`🟢${userData.first_name}`:''}</h2>
            <label htmlFor="DOB" className='text-blue-400'>DOB</label>
            <input 
              type="date" 
              name='dob' 
              id="Dob" 
              placeholder='DOB'
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" 
              value={profileData.dob} 
              onChange={handleInput}/>

            <label htmlFor="username" className='text-blue-400'>username</label>
            <input 
              type="text" 
              name="username" 
              id="username"
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" 
              placeholder='username'
              value={profileData.username} onChange={handleInput}/>

            <label htmlFor="bio" className='text-blue-400'>Bio</label>
            <input 
              type="text" 
              name="bio" 
              placeholder='bio'
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" 
              value={profileData.bio} 
              onChange={handleInput}/>

            <div className='flex justify-between gap-3 mt-2'>
              <button 
                type='submit'
                onClick={handleSkip}
                className='flex-1 border border-blue-500 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition'>Skip</button>
              <button 
                type='submit' 
                onClick={handleNextForm}
                className='flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition'>Next</button>
        </div>
        </form>
        
    </div>
    </div>
  )
}

export default Profile