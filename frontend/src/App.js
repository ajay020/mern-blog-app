import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import AddPost from './pages/AddPost';
import UpdatePost from './pages/UpdatePost';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
      <Router>
        <div>
            <Navbar />
            <Routes>
                <Route path='/' element = {<Home/>} />
                <Route path='/login' element = {<Login/>} />
                <Route path='/register' element = {<Register/>} />
                <Route path='/addPost' element = {<AddPost/>} />
                <Route path='/updatePost/:postId' element = {<UpdatePost />} />

            </Routes>
            <ToastContainer />
        </div>
    </Router>
  );
}

export default App;
