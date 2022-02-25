import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

//get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// register user
export const registerUser = createAsyncThunk("auth/register", async (user, thunkAPI)=>{
    try {
       return await authService.register(user);
    } catch (error) {
        const message = (error.response && 
            error.response.data && 
            error.response.data.message)||
            error.message ||
            error.toString();
            return thunkAPI.rejectWithValue(message);
    }
});

// login user
export const loginUser = createAsyncThunk('auth/login', async(user, thunkAPI) =>{
    try {
       return await authService.login(user);
    } catch (error) {
        const message = (error.response && 
            error.response.data && 
            error.response.data.message)||
            error.message ||
            error.toString();
            return thunkAPI.rejectWithValue(message);
    }
})

// logout user
export const logout = createAsyncThunk('auth/logout', async() =>{
    authService.logout();
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
          },
    },
    extraReducers: (builder)=>{
        builder
            .addCase(registerUser.pending, (state, action)=>{
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action)=>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null; 
            })
            .addCase(loginUser.pending, (state, action)=>{
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action)=>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null; 
            })
            .addCase(logout.fulfilled, (state, action)=>{
                state.user = null;
            })
    }
});
export const {reset}  = authSlice.actions;
export default authSlice.reducer;
