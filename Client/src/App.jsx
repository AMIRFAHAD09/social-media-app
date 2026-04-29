import Home from './pages/Home'
import Login from './pages/Login'
import BottomNav from "./pages/BottomNav";
import MyProfile from './pages/MyProfile'
import Post from './pages/Post'
import PostCard from './pages/PostCard'
import CreateProfile from './pages/CreateProfile'
import Register from './pages/Register'
import ProtectedRoute from './pages/ProtectedRoute';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import SinglePost from './pages/SinglePost'
import PublicRoute from './pages/PublicRoute';
import { useAuth } from './pages/authContext';
import Userlist from './admin/Userlist';
import Admin from './admin/Admin';
import AdminProtected from './admin/AdminProtected';

function App() {
 const {token} = useAuth()

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={token ? <Navigate to="/myprofile" /> : <Home />} />
          <Route path="/login" element={
            <PublicRoute>
              <Login/>
            </PublicRoute>
          }/>

        <Route path="/register" element={
          <PublicRoute>
            <Register/>
          </PublicRoute>
        }/>

          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <CreateProfile />
              </ProtectedRoute>}>
          </Route>

          <Route
            path='/myprofile'
            element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>}>
          </Route>
          <Route
            path='/myprofile/:id'
            element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>}>
          </Route>
          <Route
            path='/post'
            element={
              <ProtectedRoute>
                <Post />
              </ProtectedRoute>}>
          </Route>
          <Route 
          path='/mypost' 
          element={
            <ProtectedRoute>
              <PostCard />
            </ProtectedRoute>
          }>
          </Route>
          <Route 
          path='/mypost/:id' 
          element={
            <ProtectedRoute>
              <SinglePost />
            </ProtectedRoute>}>
       </Route>
      <Route
       path='/admin'
       element={<Admin/>}>

       </Route>
       <Route
        path="/admin/user"
        element={<AdminProtected><Userlist/></AdminProtected>
        }> 
       </Route>
        </Routes>
        <BottomNav />
      </BrowserRouter>
    </>
  )
}

export default App
