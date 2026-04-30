import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from './authContext'
import { HiDotsVertical } from "react-icons/hi";
import axios from 'axios';
function SinglePost() {
    const {id} = useParams()
    const{posts,setPost}= useAuth();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false)
    //get single Post
          const[singlePost, setSinglePost] = useState();
          useEffect(() => {
            const foundPost = posts.find(p => p._id === id)
            setSinglePost(foundPost)
        }, [id, posts])
    // console.log(singlePost)
   // 🛑 Prevent undefined errors
   if (!singlePost) {
    return <p>Loading...</p>
    }

    //delete single Post

    const handleDelete = async()=>{
       try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/post/${singlePost._id}`)

        // 🔥 Remove deleted post from state
       setPost(prev => prev.filter(p => p._id !== singlePost._id))
        navigate("/myprofile")
       } catch (error) {
        console.log("error from delte frontend", error)
       }
    }
  return (
    <div className="p-2">
      {/* <button onClick={() => navigate(-1)} className="mb-4">
        Go Back
      </button> */}
      
      <div className="flex flex-wrap justify-start gap-4">

          <div 
          className="bg-white shadow-lg rounded-2xl overflow-hidden">
            
            <div className="p-2 relative" >
              <HiDotsVertical  
              onClick={() => setShowMenu(prev => !prev)}
              className='absolute top-0 right-0'/>
              {showMenu && (
                <div className="absolute top-8 right-2 bg-white shadow-md rounded-lg p-2 z-10">
                  <button 
                    onClick={handleDelete}
                    className="text-red-500 hover:bg-gray-100 px-3 py-1 rounded w-full text-left"
                  >
                    Delete
                  </button>
                </div>
              )}
              <h3 className="font-semibold text-lg">{singlePost.username}</h3>
              <p className="text-gray-600">{singlePost.text}</p>
            </div>

            <div className="h-55 ">
              <img 
                src={singlePost.image} 
                alt="post" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="px-4 pb-2 flex justify-between text-sm text-gray-500">
              <span>{new Date(singlePost.createdAt).toLocaleDateString()}</span>
              <button className="text-red-500">
                ❤️ {singlePost.likes?.length || 0}
              </button>
            </div>

          </div>
      </div>
    </div>
    // <h2>{singlePost.username}</h2>
  );
}

export default SinglePost