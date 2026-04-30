import React, { useState,useEffect } from "react";
import axios from "axios";
import PostCard from "./PostCard";
import { useNavigate  } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuth } from "./authContext";
import { FaUser } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import {toast} from "react-toastify"
function MyProfile() {
    const {token,setToken,userData,setUserData,posts,setPost,searchData,setSearchData} = useAuth();
    const [showMenu, setShowMenu] = useState(false)
    const navigate = useNavigate();
      const user = {
        bio: "Frontend Developer 💻 | React Lover ⚛️",
        posts: 12,
        // followers: 340,
        following: 180,
        image: "https://i.pravatar.cc/150"
      };
 
  const handleEditProfile = ()=>{
    navigate("/profile")
  }

    // logout function
    const logoutUser = () => {
      // 1. Clear localStorage
      localStorage.removeItem("token");
      // setUserData(null);
      setToken(null);
      // 3. Redirect
      navigate("/login");
    };

    // show search user profile
    const { id } = useParams();
    const [otherUser, setOtherUser] = useState(null);
    const [otherPosts, setOtherPosts] = useState([]);
    

    useEffect(()=>{
      if(!id) return;
      const fetchUser = async()=>{
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/user/${id}`)
        setOtherUser(res.data.user);
        setOtherPosts(res.data.posts);
        // console.log(res.data)
      }
      fetchUser();
    },[id])

    // It means which profile you want to show
    const displayUser = id ? otherUser : userData;
    const displayPosts = id ? otherPosts : posts || [];

        //follow user
      const followUser = async () => {
        // console.log(id)
        try {
          const res = await axios.put(
            `${import.meta.env.VITE_API_URL}/api/auth/follow/${id}`,
            {
              userId: userData._id
            }
          );
          const updateFollow = res.data.userToFollow.followers;
         const { userToFollow, isFollowing } = res.data;

        // ✅ update other user (profile page)
        setOtherUser(userToFollow);

        // ✅ update logged-in user
        setUserData(prev => ({
          ...prev,
          following: isFollowing
            ? [...prev.following, id]
            : prev.following.filter(f => f.toString() !== id)
        }));

        toast.success(
          isFollowing ? "Followed successfully" : "Unfollowed successfully"
        );

          
          // console.log(userData)
          console.log(userToFollow)
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <div className="max-w-4xl mx-auto p-2">

      {/* 🔹 Top Section */}
      <div className="relative flex items-center gap-2">
        {/* logout function */}
         {!id && <div className="" >
          <HiDotsVertical  
          onClick={() => setShowMenu(prev => !prev)}
          className='absolute top-0 right-0'/>
          {showMenu && (
            <div className="absolute top-8 right-2 bg-white shadow-md rounded-lg p-2 z-10">
              <button 
                onClick={logoutUser}
                className="text-red-500 hover:bg-gray-100 px-3 py-1 rounded w-full text-left"
              >
                Logout
              </button>
            </div>
          )}
          
        </div>}
        {/* Profile Image */}
        {
          displayUser?.image ? (
            <img
              src={displayUser.image}
              alt="profile"
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full object-cover"
            />
          ) : (
            <FaUser className="w-24 h-24 rounded-full p-4 bg-gray-200 text-gray-500" />
          )
        }

        {/* Info */}
        <div>
          <h2 className="font-bold text-[15px] sm:text-sm md:text-base truncate">{displayUser?displayUser.username:""}</h2>

          {/* Stats */}
          <div className="flex gap-4 mt-2 font-semibold text-[10px] sm:text-sm md:text-base truncate">
            <span><b>{displayPosts ? displayPosts.length:"0"}</b> posts</span>
            <span><b>{displayUser? displayUser.followers.length:""}</b> followers</span>
            <span><b>{displayUser? displayUser.following.length:""}</b> following</span>
            
          </div>

          {/* Bio */}
          <p className="mt-2 text-gray-600 font-semibold text-[10px] sm:text-sm md:text-base truncate">{displayUser?displayUser.bio:"developer afk"}</p>

          {/* Button */}
          {!id && <button
                onClick={handleEditProfile} 
                className="mt-3 bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 font-semibold text-[10px] sm:text-sm md:text-base truncate">
            Edit Profile
          </button>}
          {id && <button
                onClick={followUser}
                className="mt-3 bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 font-semibold text-[10px] sm:text-sm md:text-base truncate">
                  {displayUser?.followers?.some(f => f.toString() === userData._id)
                    ? "Unfollow"
                    : "Follow"}
          </button>}
        </div>
      </div>

      {/* 🔹 Divider */}
      <hr className="my-6" />

      {/* 🔹 Posts Grid */}
      <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
        
       
        <PostCard 
          posts={displayPosts}
          setOtherPosts={setOtherPosts}
          setMyPosts={setPost}
          isOtherUser={!!id}
          />
      </div>

    </div>
  
  );
}

export default MyProfile;