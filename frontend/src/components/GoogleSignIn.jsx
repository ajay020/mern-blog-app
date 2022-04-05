import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { loginWithGoogle } from "../features/auth/authSlice";

const GoogleSignIn = () => {
  const dispatch = useDispatch();

  const onSuccess = (res) => {
    // console.log("Login success, currentUser : ", res.tokenId);
    dispatch(loginWithGoogle(res.tokenId));
  };

  const onFailure = (res) => {
    console.log("Login failed", res);
  };

  return (
    <>
      <GoogleLogin
        clientId={process.env.REACT_APP_CLIENT_ID}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        isSignedIn={true}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
};

export default GoogleSignIn;
