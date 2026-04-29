import React from 'react'
import { useAuth } from './authContext';
import { useNavigate } from 'react-router-dom';

function SearchUser() {
    const{searchData} = useAuth();
    const navigate = useNavigate();
  return (
    <div className='flex flex-col w-80 h-20 gap-3 justify-between mt-4'
        >
        {
            searchData.map((curEle,index)=>(
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
                    <button className='mx-4 bg-blue-500 text-white px-3 rounded font-bold h-8'>follow</button>
                </div>

                </div>
            ))
        }
    </div>
  )
}

export default SearchUser