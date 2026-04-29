import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";
import { RiFolderUploadFill } from "react-icons/ri";
function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
const[isActive,setIsActive] = useState(null)
  // ❌ hide on login & register
  if (location.pathname === "/" || location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white inset-shadow-xs  flex justify-around p-2">
      
      <button
        onClick={() => {
          navigate("/post")
          setIsActive("upload")
        }}
        className={`font-bold rounded-full px-2 py-2 ${isActive=="upload" ? 'bg-black text-white' : 'bg-gray-100'}`}
      >
        <RiFolderUploadFill />
      </button>

      <button
        onClick={() => {
          navigate("/profile")
          setIsActive("edit")
        }}
        className={`font-bold px-2 py-2 rounded-full ${isActive=="edit" ? 'bg-black text-white' : 'bg-gray-100'}`}
      >
        <MdModeEdit />
      </button>

      <button
        onClick={() => {
          navigate("/post")
          setIsActive("search")
        }}
        className={`font-bold px-2 py-2 rounded-full ${isActive=="search" ? 'bg-black text-white' : 'bg-gray-100'}`}
      >
        <FaSearch />

      </button>
      <button
        onClick={() => {
          navigate("/myprofile")
          setIsActive("profile")
        }}
        className={`font-bold px-2 py-2 rounded-full ${isActive=="profile" ? 'bg-black text-white' : 'bg-gray-100'}`}
      >
        <FaUser />
      </button>

    </div>
  );
}

export default BottomNav;


