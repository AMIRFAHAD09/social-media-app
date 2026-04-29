const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../model/user-model")
const Post = require("../model/post-model")
const jwt = require("jsonwebtoken");


const Signup = async(req,res)=>{
    const data = req.body;
    const ExitsEmail =await User.findOne({email:data.email})
    if(ExitsEmail) 
        return res.status(409).json({msg:"email already exist"})

    const hashPassword = await bcrypt.hash(data.password,10)
    const userData = await User.create({
        first_name:data.first_name,
        last_name:data.last_name,
        email:data.email,
        phone:data.phone,
        gender:data.gender,
        password:hashPassword
    })
    // console.log(userData)
    res.status(201).json({mes:"user Registerd",data:userData})
}

const Login = async(req,res)=>{
    const {email,password} = req.body;
    const ExitsEmail = await User.findOne({email})
    // console.log(ExitsEmail)
    if(!ExitsEmail) 
        return res.status(404).json({msg:"user not exist"})

    const passwordValid = await bcrypt.compare(password,ExitsEmail.password);

    if(passwordValid){
        const token = jwt.sign(
            { id: ExitsEmail._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" }
        );
        return res.status(200).json({msg:"login success",token})
    }
    else{
        return res.status(401).json({msg:"inavlid credintial"})
    }
       
}
//udate user profile
const updateProfile = async(req,res)=>{
    try {
        const { username, dob,bio,image } = req.body;

        const ExitsUsername =await User.findOne({username:username})
        if(ExitsUsername) 
        return res.status(409).json({msg:"This username taken already by other users"})

        const updatedUser = await User.findByIdAndUpdate(
            req.userId,
            {
                username,
                image,
                dob,
                bio,
            },
            { new: true }
        );
        res.status(200).json({
            msg: "Profile updated",
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({ msg: "Error updating profile" });
    }
}
//get logged user data
const getUser = async (req, res) => {
    const user = await User.findById(req.userId).select("-password");
    res.status(200).json(user);
};

//get search user data profile and their posts
// GET /api/user/:id
const getSearchUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    const posts = await Post.find({ user: req.params.id });

    res.status(200).json({ user, posts });
  } catch (error) {
    console.log("error fetching profile", error);
    res.status(500).json({ message: "Server error" });
  }
};

//follow and unfollow
const follow = async (req, res) => {
  const followId = req.params.id;   // user to follow
  const userId = req.body.userId;   // current logged-in user

  try {
    if (followId === userId) {
      return res.status(400).json({ message: "You can't follow yourself" });
    }

    const userToFollow = await User.findById(followId);
    const currentUser = await User.findById(userId);

    // check already followed
     let isFollowing = userToFollow.followers.includes(userId);
    if (isFollowing) {
    //   return res.status(400).json({ message: "Already followed" });
        userToFollow.followers = userToFollow.followers.filter((id)=>id.toString() !== userId)
        //remove following 
        currentUser.following = currentUser.following.filter((id)=>id.toString() !== followId)
        // res.status(200).json({ message: "unFollowed successfully" });
    }

    else{
        // add follower
        userToFollow.followers.push(userId);
        currentUser.following.push(followId);
        // res.status(200).json({ message: "Followed successfully" });
    }
    

    await userToFollow.save();
    await currentUser.save();

    res.status(200).json({
        userToFollow,
        isFollowing: !isFollowing,
      message: isFollowing
        ? "Unfollowed successfully"
        : "Followed successfully",
        })


  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports  = {Signup,Login,getUser,updateProfile,getSearchUserProfile,follow};