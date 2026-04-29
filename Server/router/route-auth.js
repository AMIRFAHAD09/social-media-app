const express = require("express");
const {Login,Signup,getUser,updateProfile, getSearchUserProfile, follow} = require("../controller/auth-controller");
const authMiddleware = require('../middleware/auth-middleware')
const router = express.Router();

router.post("/register",Signup)
router.post("/login",Login)
//update profile 
router.put("/updateProfile",authMiddleware,updateProfile)
//get logged user data
router.get('/user',authMiddleware,getUser)
//other user post and profile find
router.get("/user/:id",getSearchUserProfile)
//follow and unfollow
router.put("/follow/:id",follow)
module.exports  = router; 