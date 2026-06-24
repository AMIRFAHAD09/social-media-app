import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from './authContext';
import axios from 'axios';

function FollowersList() {
    const{userData} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const[myfollowing,setMyfollowing]=useState([]);
    const[myfollower,setMyfollower]=useState([]);
    const followingList = userData?.following || [];
    const FollowersList = userData?.followers || [];

    // tab switch from followes to following
    const [tab, setTab] = useState(location.state?.tab || "followers");
    // console.log(userData)

    // fetch following list
    const fetchFollowing = async()=>{

        try {
            const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/auth/followinglist`,
            { ids: followingList }
             );
            setMyfollowing(res.data)
        } catch (error) {
            console.log("getting error when fetch following in frontend side")
        }
    }

    //fetch followers list
    const fetchFollower = async()=>{

        try {
            const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/auth/followerlist`,
            { ids: FollowersList }
             );
            setMyfollower(res.data)
        } catch (error) {
            console.log("getting error when fetch following in frontend side")
        }
    }

    useEffect(()=>{
        if (userData?.following?.length) {
        fetchFollowing();
        }
        if (userData?.followers?.length) {
        fetchFollower();
        }
    },[userData])
    // console.log(myfollowing)
  return (
    <div className='max-w-4xl mx-auto px-3 mt-4'>
        <div className='flex gap-5'>
            <h3 onClick={() => setTab("followers")} 
            className={tab=="followers" ? "border-b-2 border-neutral-800":"text-neutral-500"}>Followers</h3>
            <h3
            onClick={() => setTab("following")} 
            className={tab=="following" ? "border-b-2 border-neutral-800":"text-neutral-500"}>Following</h3>
        </div>
        <hr className='text-zinc-300'/>
        <div>
            <input
                className='mt-4 px-2 py-1 w-full border rounded' 
                type="search" 
                name="search" 
                placeholder='search' />
        </div>
        <div className='flex flex-col w-80 h-20 gap-3 justify-between mt-4'>
            {/* following */}
        {tab=="following" &&
            myfollowing.map((curEle,index)=>(
                <div className='flex w-full h-20  gap-3 py-4 px-2' 
                     key={index}
                     onClick={()=>navigate(`/myprofile/${curEle._id}`)}>
  
                <div className='flex items-center gap-2'>
                    <img 
                    className='rounded-full border h-15 w-15'
                    src={curEle.image} 
                    alt="" 
                    />
                    <h1 className='font-bold'>{curEle.username}</h1>
                </div>

                <div className='ml-auto flex items-center'>
                    <button className='mx-4 bg-blue-500 text-white px-3 rounded font-bold h-8'>unfollow</button>
                </div>

                </div>
            ))
        }
        {tab=="followers"&&
            myfollower.map((curEle,index)=>(
                <div className='flex w-full h-20  gap-3 py-4 px-2' 
                     key={index}
                     onClick={()=>navigate(`/myprofile/${curEle._id}`)}>
  
                <div className='flex items-center gap-2'>
                    <img 
                    className='rounded-full border h-15 w-15'
                    src={curEle.image} 
                    alt="" 
                    />
                    <h1 className='font-bold'>{curEle.username}</h1>
                </div>

                <div className='ml-auto flex items-center'>
                    <button className='mx-4 bg-blue-500 text-white px-3 rounded font-bold h-8'>follow back</button>
                </div>

                </div>
            ))
        }
        </div>
    </div>
  )
}

export default FollowersList