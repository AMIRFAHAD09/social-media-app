const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth-middleware");
const {postCreate,getPost, deletePost, searchUser, likedPost,follow} = require("../controller/post-controller");

router.post("/create",authMiddleware,postCreate)
//get all posts
router.get("/get",authMiddleware,getPost)
//delete post
router.delete("/:id",deletePost)
//search user by username
router.get("/search",searchUser)
//post liked by users
router.put("/like/:id",likedPost)

module.exports  = router; 