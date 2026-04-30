import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoMdHeartEmpty } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';

function PostCard({ posts,setMyPosts, setOtherPosts, isOtherUser }) {
  const navigate = useNavigate();
  const{userData,getMyPost} = useAuth();
 if (!posts) return <p>Loading...</p>;
const likeButton = async(postId)=>{
  // console.log("button click")
  // console.log(posts)
  
  try {
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/post/like/${postId}`,
      {
        userId:userData._id
      }
    )
    // console.log(res.data)
     const updatedLikes = res.data.likes;
    //  console.log(updatedLikes)
    if (isOtherUser) {
      setOtherPosts(prev =>
        prev.map(post =>
          post._id === postId
            ? { ...post, likes: updatedLikes }
            : post
        )
      );
    } else {
      setMyPosts(prev =>
        prev.map(post =>
          post._id === postId
            ? { ...post, likes: updatedLikes }
            : post
        )
      );
    }
    
  } catch (error) {
    console.log(error)
  }
}

  return (
   
    <div className="p-2">
  <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6">
    
    {posts?.map((post) => (
      <div 
        key={post._id} 
        className="bg-white shadow-md sm:shadow-lg rounded-lg sm:rounded-2xl overflow-hidden w-full"
      >
        
        <div onClick={() => navigate(`/mypost/${post._id}`)}>
          
          {/* Text */}
          <div className="px-2 py-1 sm:px-3 sm:py-2">
            <h3 className="font-semibold text-[10px] sm:text-sm md:text-base truncate">
              {post.username}
            </h3>
            <p className="text-gray-600 text-[9px] sm:text-xs md:text-sm line-clamp-2">
              {post.text}
            </p>
          </div>

          {/* Image */}
          <div className="aspect-square">
            <img 
              src={post.image} 
              alt="post" 
              className="w-full h-full object-cover"
            />
          </div>
        </div> 

        {/* Footer */}
        <div className="px-2 sm:px-3 pb-2 flex justify-between text-[10px] sm:text-xs md:text-sm text-gray-500">
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          
          <button onClick={() => likeButton(post._id)}>
            ❤️ {post.likes.length}
          </button>
        </div>

      </div>
    ))}

  </div>
</div>
  );
      };

export default PostCard 