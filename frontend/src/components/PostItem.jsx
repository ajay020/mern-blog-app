import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deletePost } from "../features/post/postSlice";

const PostItem = ({
  post: { _id, user, username, title, content, createdAt },
}) => {
  const { user: currentuser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //   console.log(currentuser, typeof currentuser);
  const onClickHandler = (postId) => {
    dispatch(deletePost(postId));
  };

  let date = new Date(createdAt);
  let formatedDate =
    date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();

  return (
    <div className="card my-2" style={{ width: "26rem" }}>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div className=" me-2">
            <p className="card-title fw-bold m-0 p-0 text-capitalize fs-5 lh-1">
              {title}
            </p>
            <small className=" m-0 p-0 fst-normal text-capitalize ">
              {username ? username : "Anonymous"}
            </small>
            <small className=" ms-2 p-0 fst-italic fw-lighter ">
              {formatedDate}
            </small>
          </div>
          <div className=" d-flex">
            {currentuser && currentuser._id === user.toString() && (
              <>
                <i
                  onClick={() => onClickHandler(_id)}
                  className="bi bi-trash3-fill me-3 text-danger"
                  role={"button"}
                ></i>
                <Link to={`/updatePost/${_id.toString()}`}>
                  <i className="bi bi-pencil-square" role={"button"}></i>
                </Link>
              </>
            )}
          </div>
        </div>
        <hr className=" my-1 p-0" />

        <p className="card-text">{content}</p>
      </div>
    </div>
  );
};

export default PostItem;
