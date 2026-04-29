const express = require("express");
const User = require("../model/user-model")
const Post = require("../model/post-model")

const postCreate = async(req,res)=>{
    // const data  = req.body;
   
    try {
        const userPost = await User.findById(req.userId);
        const{text,postImage} = req.body
        // console.log(req.body)
        const post = new Post({
            user: req.userId,
            username: userPost.username,
            text,
            image:postImage
          });
      
          await post.save();
          res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    // res.status(200).json({data,id:req.userId})
    
  
}

//get all post here
const getPost = async(req,res)=>{
    try {
        const myPosts = await Post.find({ user: req.userId });
        res.status(200).json(myPosts)
    } catch (error) {
        console.log("error from get post", error)
    }
}
// search user by username
const searchUser = async(req,res)=>{
    const{username} = req.query
    try {
        const usersBySearch = await User.find({username: { $regex:`^${username}`, $options: "i" }}).select("-password")
        res.status(200).json(usersBySearch)
    } catch (error) {
        console.log("error from get post", error)
    }
}

//delete post here
const deletePost = async(req,res)=>{
    // console.log(req.params.id)

    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id)
        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" })
          }
      
          res.status(200).json({ message: "Post deleted successfully",id:req.params.id })
    } catch (error) {
        console.log("error in backend when delete post",error)
    }
}

//liked post by users
const likedPost = async(req,res)=>{

    const postId = req.params.id;
    const userId = req.body.userId;
    try {
        const post = await Post.findById(postId)
        
         // check if already liked
    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      // unlike (remove)
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      // like (add)
      post.likes.push(userId);
    }

    await post.save()
    // ✅ THIS LINE IS MISSING
    res.status(200).json(post);
    // console.log(post)

    } catch (error) {
      console.log(error)  
    }


}


module.exports = {postCreate,getPost,deletePost,searchUser,likedPost};