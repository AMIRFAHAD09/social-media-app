import React from 'react'
import { Navigate } from 'react-router-dom';
function AdminProtected({children}) {
   const isAdmin = localStorage.getItem("isAdmin");
  if (!isAdmin) {
    return <Navigate to="/admin" />; // login page pe bhej do
  }
  return children;
}

export default AdminProtected

