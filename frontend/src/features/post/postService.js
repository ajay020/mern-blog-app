import axios  from 'axios';

const API_URL = '/api/posts/';

const getPosts = async () =>{
    const response = await axios.get(API_URL);
    return response.data;
}

const createPost = async (postData, token) =>{
    
    const config = {
        headers :{
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, postData, config);
    return response.data; 
}

//update post
const updatePost = async(post, token)=>{
    const config = {
        headers :{
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const response = await axios.patch(API_URL+(post.postId).toString(), post.postData, config);
        return response.data; 
    } catch (error) {
        console.log("==========>",error);
    }
}

const deletePost = async (postId, token) =>{
    const config = {
        headers :{
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + postId, config);
    return response.data; 
}

const upvotePost = async (postId, token) => {
    const config = {
        headers :{
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const response = await axios.post(API_URL + "upvote/" + postId, {},  config);
        // console.log("response data >>>>",response.data);
    
        return response.data;    
    } catch (error) {
        console.log(error);
    }
    
}

const postService = {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    upvotePost 
}

export default postService;