import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostItem from "../components/PostItem";
import Spinner from "../components/Spinner";
import { getPosts, reset } from "../features/post/postSlice";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.post
  );
  const currentUser = useSelector((state) => state.auth.user);

  //show toast message
  const notify = (message) => toast(message);

  //sort posts in latest created first
  let sortedPost = posts.slice().sort((a, b) => {
    let x = new Date(a.createdAt);
    let y = new Date(b.createdAt);
    if (x < y) return 1;
    if (x > y) return -1;
    return 0;
  });

  useEffect(() => {
    if (isError) {
      console.log(message);
      notify(message);
    }
    dispatch(getPosts());

    return () => {
      //   dispatch(reset());
    };
  }, [isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div
      className="
        container-fluid d-flex
        flex-column align-items-center
          "
      style={{
        marginTop: "55px",
        // height: "100vh",
        // position: "relative",
        paddingBottom: "2rem",
      }}
    >
      {sortedPost.length > 0 ? (
        sortedPost.map((post) => <PostItem key={post._id} post={post} />)
      ) : (
        <h1>No post available</h1>
      )}
    </div>
  );
};

export default Home;
