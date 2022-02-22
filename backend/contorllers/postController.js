const { v4: uuidv4 } = require('uuid');

let posts = [
    {
        id: "1",
        title: "post title 1",
        body: "post body 1"
    },
]

const getPosts = (req, res) =>{
    res.status(200).json(posts);
}

const createPost = (req, res) => {
    const newPost = {
        id: uuidv4(),
        ...req.body 
    }
    
    posts.push(newPost);
    res.status(200).json(posts)
}

const updatePost = (req, res) => {
    const {postId} =  req.params;
    const updates = req.body

    posts = posts.map(post => {
        if(post.id === postId){
            let t = { ...post,...updates}
            return t;
        }
        return post;
    })

    res.status(200).json(posts);
}

const deletePost =(req, res)=>{
    const {postId} = req.params;
    posts = posts.filter(post => post.id !== postId);
    res.status(200).json(posts)
}

module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost 
}