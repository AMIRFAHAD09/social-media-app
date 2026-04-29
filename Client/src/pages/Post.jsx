import React, { useState } from 'react'
import { FaUpload } from "react-icons/fa6";
import { IoCloudUploadSharp } from "react-icons/io5";
import PostCard from './PostCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';
import SearchUser from './SearchUser';

function Post() {
    const{setSearch,search,posts} = useAuth();
    const token = localStorage.getItem("token");
    const[showForm, setForm]=useState(false)
    const [imageP, setImageP] = useState("");
    const [uploading, setUploading] = useState(false);
    const[createPost, setCreatePost] = useState({text:"",postImage:""})
    const navigate = useNavigate();

    //handle Image Post
    const handleImageChange = async (e) => {
      const file = e.target.files[0];
    
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "Social Media app");
    
      try {
        setUploading(true);
    
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dilexvciy/image/upload",
          data
        );
    
        const imageUrl = res.data.url;
    
        setImageP(imageUrl);
    
        setCreatePost((prev) => ({
          ...prev,
          postImage: imageUrl
        }));
        console.log(createPost)
      } catch (error) {
        console.log("error when upload image for post", error);
      } finally {
        setUploading(false);
      }
    };
    //handle post form
    const handlePostInput = (e)=>{
      e.preventDefault();
      const name = e.target.name;
      const value = e.target.value;

      setCreatePost({
        ...createPost,
        [name]:value
    })
    }
    // create post
    const handlePost = async (e) => {
        e.preventDefault();
       try {
        const res =  await axios.post('http://localhost:2000/api/post/create',createPost , {
            headers: { Authorization: token }
          });
          console.log(res)
          setCreatePost({ text: "", postImage: "" });
          setImageP("");
       } catch (error) {
        console.log("error from post",error)
       }
      };
     const handleMyPost = ()=>{
      navigate('/mypost');
     }
     const handleProfile=()=>{
      navigate('/myprofile');

     }
// search function
const handleSearch=(e)=>{
  setSearch(e.target.value)
}


  return (
    <div className=' max-w-4xl mx-auto p-2'>
       <div className=' bg-white py-3 '>
         <button 
            className='bg-gray-200 px-2 py-2 mx-3  rounded-full' onClick={()=> setForm(!showForm)}><FaUpload />
         </button>
          <input 
            className='border rounded px-1'
            type="search" 
            placeholder='search user'
            value={search}
            onChange={handleSearch}/>
            {/* <button>search</button> */}
       </div>
       <hr />
       {showForm &&(
        <div className='fixed inset-0 flex items-center justify-center bg-gradient-to-r from-[rgba(7,129,135,0.98)] via-[rgba(24,153,144,1)] to-[rgba(111,237,233,1)] bg-opacity-50'>
        <form className='bg-white p-6 rounded-lg w-76 flex flex-col gap-4 relative'
        onSubmit={handlePost}>
          {/* Close Button */}
        <button 
          type="button"
          className='absolute top-2 right-2 text-red-500'
          onClick={() => setForm(false)}
        >
          ✖
        </button>

        <h2 className='text-xl font-bold text-center'>Create Post</h2>
          {/* Textarea */}
          <textarea
          className=' p-2 rounded outline-none'
          name="text"
          placeholder="Write Caption ..."
          value={createPost.text}
          onChange={handlePostInput}
        />

        {/* Image Preview */}
        <label className="flex items-center justify-center h-55 border rounded cursor-pointer">
        {imageP ? (
          <img 
            src={imageP} 
            alt="preview" 
            className='w-full h-55 object-cover rounded'
          />
        ):<IoCloudUploadSharp size={40} className="text-gray-400"/>}
        {/* File Input */}
        <input 
          type="file" 
          name="photo" 
          className='hidden'
          onChange={handleImageChange}
        />
      </label>
          {/* Submit Button */}
        <button 
          type="submit" 
          disabled={uploading || !createPost.postImage}
          className='bg-cyan-600 text-white py-2'
        >
          {uploading ? "Uploading..." : "Share"}
        </button>
        </form>
        </div>
       )}
      
      {search?<SearchUser/>:<PostCard posts={posts}/>
       }
       
    </div>
  )
}

export default Post