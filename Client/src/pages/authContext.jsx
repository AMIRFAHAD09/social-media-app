import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{

    //get token 
    const[token,setToken]=useState(localStorage.getItem('token')|| null)


    //get user data 
    const [userData, setUserData] = useState(null); 
      useEffect(() => {
        const fetchData = async () => {
          if (!token) return;
          try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/user`,
              {
                headers: {
                  Authorization: token
                }
              }
            );
            setUserData(response.data); // Automatically parses JSON
          } catch (error) {
            console.error(error);
          } 
        };
        fetchData();
      }, [token]);

      //get all Post
      const[posts,setPost]= useState([])
      const getMyPost = async()=>{
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/post/get`,
            {
              headers:{
                Authorization:token
              }
            }
          )
          setPost(res.data);
          // console.log(res.data)
        } catch (error) {
          console.log("error from get post",error)
        }
      }
      useEffect(()=>{
        if(token){
          getMyPost();
        }
       
      },[token])

      //search user
      const[search, setSearch] = useState("")
      const[searchData,setSearchData] = useState([])
      useEffect(()=>{
        if (!search) return;
         const findUser = async () => {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/post/search`,
            {
              params:{
                  username: search
              } 
            }
          );

              // console.log(res.data);
              setSearchData(res.data)
              // console.log(searchData)
            } catch (error) {
              console.log("error when searching", error);
            }
          };
          findUser();
      },[search])
    return <AuthContext.Provider value={{token,setToken,userData,setUserData,posts,setPost,getMyPost,search,setSearch,searchData,setSearchData}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = ()=>{
    return useContext(AuthContext)
}