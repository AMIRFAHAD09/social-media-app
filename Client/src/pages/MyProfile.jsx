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
      // const user = {
      //   bio: "Frontend Developer 💻 | React Lover ⚛️",
      //   posts: 12,
      //   // followers: 340,
      //   following: 180,
      //   image: "https://i.pravatar.cc/150"
      // };
 
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
          // const updateFollow = res.data.userToFollow.followers;
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
          // console.log(userToFollow)
        } catch (error) {
          console.log(error);
        }
      };
  return (
  <div className="max-w-4xl mx-auto ">

    <div className="relative">
          <div className="h-18 sm:h-22 rounded-2xl bg-stone-600">
             <div className="flex items-center justify-center gap-3">
              <div className="min-w-[75px] sm:min-w-[90px] bg-gray-800 rounded-xl px-2 py-1 sm:py-2 text-center shadow mt-3">
                <p className="font-bold text-sm sm:text-lg text-zinc-200">{displayPosts ? displayPosts.length:"0"}</p>
                <p className=" text-xs text-zinc-200">Post</p>
              </div>
               <div
               onClick={()=>navigate("/followerlist",{ state: { tab: "followers" } })} 
               className="min-w-[75px] sm:min-w-[90px] bg-gray-800 rounded-xl px-2 py-1 sm:py-2 text-center shadow mt-3">
                <p className="font-bold text-sm sm:text-lg text-zinc-200">{displayUser? displayUser.followers.length:""}</p>
                <p className="text-xs text-zinc-200">Followers</p>
              </div>
               <div 
               onClick={()=>navigate("/followerlist",{ state: { tab: "following" } })}
               className="min-w-[75px] sm:min-w-[90px] bg-gray-800 rounded-xl px-2 py-1 sm:py-2 text-center shadow mt-3">
                <p className="font-bold text-sm sm:text-lg text-zinc-200">{displayUser? displayUser.following.length:""}</p>
                <p className="text-xs text-zinc-200">Following</p>
              </div>
            </div>
          </div>
          <div className="sm:w-20 sm:h-20 md:w-24 md:h-24 absolute -bottom-10 left-4 rounded-full inset-shadow-xl border-2 border-gray-300">
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
          </div>
          <div>
            {!id && <div className="" >
          <HiDotsVertical  
          onClick={() => setShowMenu(prev => !prev)}
          className='absolute top-3 right-1 text-gray-800 text-2xl'/>
          {showMenu && (
             <div className="absolute top-8 right-2 bg-white shadow-md rounded-lg z-10 min-w-[120px]">
              <button
                onClick={logoutUser}
                className="text-red-500 hover:bg-gray-100 px-3 py-2 w-full text-left"
              >
                Logout
              </button>

              <div className="border-t border-gray-200"></div>

              <button
              onClick={()=>navigate("/admin")}
                className="hover:bg-gray-100 px-3 py-2 w-full text-left"
              >
                Admin
              </button>
            </div>
          )}

            </div>}
          </div>
    </div>

        <div className="flex items-end  justify-start px-2 gap-5">
          <div className="mt-12 px-4">
            {/* username */}
            <h2 className="text-xl font-bold">{displayUser?displayUser.username:""}</h2>
            {/* {Bio} */}
            <p className="text-sm text-gray-400">{displayUser?displayUser.bio:"developer afk"}</p>
          </div>
            {/* Button */}
            <div>
            {!id && <button
                  onClick={handleEditProfile} 
                  className="mb-1 bg-blue-500 text-white px-4 py-1  rounded-lg hover:bg-blue-600 font-semibold text-[10px] sm:text-sm md:text-base truncate">
              Edit Profile
            </button>}
            {id && <button
                  onClick={followUser}
                  className="mb-1 bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 font-semibold text-[10px] sm:text-sm md:text-base truncate">
                    {displayUser?.followers?.some(f => f.toString() === userData._id)
                      ? "Unfollow"
                      : "Follow"}
            </button>}
           </div>
           
         </div>
      {/* 🔹 Divider */}
      <hr className="my-" />

      {/* 🔹 Posts Grid */}
      <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))] mt-6">
        
       
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