const express  = require('express');
const { 
      getPosts,
      updatePost, 
      deletePost,
      createPost } = require('../contorllers/postController');

const router = express.Router();


//@ get all posts
// GET /api/posts
//access public
router.get("/", getPosts);

//@ create new post
// POST /api/posts
//access private
router.post("/", createPost)


//@ update post
// PATCH /api/posts
//access private
router.patch("/:postId", updatePost);

//@ delete post
// Delete /api/posts
//access private
router.delete("/:postId", deletePost)



module.exports = router ;