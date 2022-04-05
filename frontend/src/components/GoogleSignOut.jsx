import { GoogleLogout } from "react-google-login";

const GoogleSignOut = () => {
  const onSuccess = (res) => {
    console.log("Logout made successfully ");
  };

  return (
    <>
      <GoogleLogout
        clientId={process.env.REACT_APP_CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </>
  );
};

export default GoogleSignOut;
