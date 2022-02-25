import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost, reset } from "../features/post/postSlice";
import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

const AddPost = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const { title, content } = formData;
  const { posts, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.post
  );

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const postData = {
      ...formData,
    };
    dispatch(createNewPost(postData));
    setFormData({ title: "", content: "" });
    navigate("/");
  };

  if (isLoading) {
    return <h2>Posting...</h2>;
  }

  return (
    <div className="container w-50 mx-auto my-5 ">
      <h3 className="text-center">Create Post </h3>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="titleInput">Post Title</label>
          <input
            onChange={onChange}
            type="text"
            name="title"
            value={title}
            className="form-control"
            id="titleInput"
            aria-describedby="titleHelp"
            placeholder="Enter title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="postContent">Post Content</label>
          <textarea
            onChange={onChange}
            name="content"
            value={content}
            type="text"
            className="form-control"
            id="postContent"
            placeholder="write here..."
          />
        </div>
        <div className="form-group my-2">
          <button type="submit" className="btn btn-primary">
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
