import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import AddPost from './pages/AddPost';
import UpdatePost from './pages/UpdatePost';
import 'react-toastify/dist/ReactToastify.css';
import PageNotFound from './pages/PageNotFound';
import BookMarkPostList from './components/BookMarkPostList';
import PostDetails from './pages/PostDetails';
import { useEffect } from 'react';


function App() {

    useEffect(() =>{
        document.body.style.backgroundColor = "#555";
    }, [])

  return (
      <Router>
        <div>
            <Navbar />
            <Routes>
                <Route path='/' element = {<Home/>} />
                <Route path='/login' element = {<Login/>} />
                <Route path='/register' element = {<Register/>} />
                <Route path='/addPost' element = {<AddPost/>} />
                <Route path='/post-details/:postId' element = {<PostDetails/>} />
                <Route path='/bookmarked-posts' element = {<BookMarkPostList/>} />
                <Route path='/updatePost/:postId' element = {<UpdatePost />} />
                <Route path="*" element={<PageNotFound/>}/>

            </Routes>
            <ToastContainer />
        </div>
    </Router>
  );
}

export default App;
