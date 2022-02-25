import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostItem from "../components/PostItem";
import Spinner from "../components/Spinner";
import { getPosts, reset } from "../features/post/postSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    // if (!isSuccess) {
    dispatch(getPosts());
    // }

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="container-fluid d-flex flex-column align-items-center bg-secondary mt-5 vh-100">
      {posts.length > 0 ? (
        posts.map((post) => <PostItem key={post._id} post={post} />)
      ) : (
        <p>No post available</p>
      )}
    </div>
  );
};

export default Home;
