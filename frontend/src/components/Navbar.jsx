import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isCollapse, setIsCollapse] = useState(true);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <nav
      className="
        navbar navbar-expand-lg
        navbar-dark bg-dark fixed-top"
    >
      <div className="container px-5">
        <Link className="navbar-brand" to="/">
          Blog App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setIsCollapse(!isCollapse)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`${isCollapse ? "collapse" : ""} navbar-collapse `}
          id="navbarNav"
        >
          <ul className="navbar-nav w-100 d-flex ">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {user && (
              <li className="nav-item me-auto">
                <Link className="nav-link" to="addPost">
                  New Post
                </Link>
              </li>
            )}

            {user ? (
              <>
                <li className="nav-item" onClick={onLogout}>
                  <a role="button" className="nav-link cursor-pointer">
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
