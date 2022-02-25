import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postService from './postService';

const initialState = {
    posts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

//get all posts
export const getPosts = createAsyncThunk(
    "posts/getAll",
    async (_, thunkAPI) =>{
        try {
            return await postService.getPosts();
        } catch (error) {
            const message = (error.response && 
                    error.response.data && 
                    error.response.data.message)||
                    error.message ||
                    error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

// create new  post 
export const createNewPost = createAsyncThunk(
    'posts/newPost',
    async (post, thunkAPI) =>{
        try {
            const token = thunkAPI.getState().auth.user?.token;
            return await postService.createPost(post, token);
        } catch (error) {
            const message = (error.response && 
                error.response.data && 
                error.response.data.message)||
                error.message ||
                error.toString();
                return thunkAPI.rejectWithValue(message);
        }
    }
)

// Update Post

export const updatePost =  createAsyncThunk(
    'posts/update',
    async (post, thunkAPI)=>{
        try {
            const token =  thunkAPI.getState().auth.user.token;
            return await postService.updatePost(post, token);
        } catch (error) {
            console.log("+++++++++++++++",error);
            const message = (error.response && 
                error.response.data && 
                error.response.data.message)||
                error.message ||
                error.toString();
                return thunkAPI.rejectWithValue(message);
        }
    }
)

//delete post
export const deletePost = createAsyncThunk(
    'posts/delete',
    async(id, thunkAPI)=>{
        
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await postService.deletePost(id, token);    
        } catch (error) {
            const message = (error.response && 
                error.response.data && 
                error.response.data.message)||
                error.message ||
                error.toString();
                return thunkAPI.rejectWithValue(message);
        }
    }
)


const postSlice = createSlice({
    name:'post',
    initialState,
    reducers:{
        reset : (state) => {
            return initialState ;
        }
    },
    extraReducers : (builder) =>{
        builder
            .addCase(getPosts.pending, (state, action) =>{
                state.isLoading = true;
            })
            .addCase(getPosts.fulfilled, (state, action) =>{
                state.isLoading = false;
                state.isSuccess = true;
                state.posts = action.payload;
            })
            .addCase(getPosts.rejected, (state, action) =>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload ;
            })
            .addCase(createNewPost.pending, (state, action) =>{
                state.isLoading = true;
            })
            .addCase(createNewPost.fulfilled, (state, action) =>{
                state.isLoading = false;
                state.isSuccess = true;
                state.posts.push(action.payload);
            })
            .addCase(createNewPost.rejected, (state, action) =>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload ;
            })
            .addCase(updatePost.pending, (state, action) =>{
                state.isLoading = true;
            })
            .addCase(updatePost.fulfilled, (state, action) =>{
                state.isLoading = false;
                state.isSuccess = true;
                const posts = state.posts.filter(post => post._id !== action.payload._id);
                state.posts = [...posts, action.payload];
            })
            .addCase(updatePost.rejected, (state, action) =>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload ;
            })
            .addCase(deletePost.pending, (state, action) =>{
                state.isLoading = true;
            })
            .addCase(deletePost.fulfilled, (state, action) =>{
                state.isLoading = false;
                state.isSuccess = true;
                state.posts = state.posts.filter(post => post._id !== action.payload.id);
            })
            .addCase(deletePost.rejected, (state, action) =>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload ;
            })
    }
});

export const {reset} = postSlice.actions ;

export default postSlice.reducer