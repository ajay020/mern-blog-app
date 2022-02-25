const { v4: uuidv4 } = require('uuid');
const Post = require('../models/postModel');


const getPosts = async (req, res) =>{
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({ err : error.message});
    }
}

const createPost = async(req, res) => {
    if(!req.body){
        res.status(400).json({message : "Please enter data"});
    }
    
    try {
        const post  = await Post.create(
            {
                user:req.user.id,
                username: req.user.name,
                 ...req.body
            });
        res.status(200).json(post);

    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

const updatePost = async(req, res) => {
    const {postId} =  req.params;

    try {
        const post = await Post.findById(postId);
        if(!post){
           return res.status(401).json({message: "Post not found"});
        }
        // check if post is created by current user
        if(post.user.toString() !== req.user._id.toString()){
            console.log(post.user, req.user._id);
            return res.status(401).json({message: "User not authorized"});
        }
        //update post
        const updatedPost = await Post.findByIdAndUpdate(postId, req.body, {new: true});
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({err: error.message});
    } 
}

const deletePost = async(req, res)=>{
    const {postId} = req.params;

    try {
        const post = await Post.findById(postId);

        if(!post){
            return res.status(400).json({message: 'post not found'});
        }
        // check if post is created by current user
        if(post.user.toString() !== req.user.id.toString()){
            return res.status(401).json({message: "User not authorized"});
        }
        
        await post.remove();
        res.status(200).json({id: postId});
    } catch (error) {
        res.status(400).json({err: error.message});
    }
}

module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost 
}