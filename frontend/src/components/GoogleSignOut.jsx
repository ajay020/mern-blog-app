import { GoogleLogout } from "react-google-login";

const GoogleSignOut = () => {
  const onSuccess = (res) => {
    console.log("Logout made successfully ");
  };

  return (
    <>
      <GoogleLogout
        clientId={process.env.CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </>
  );
};

export default GoogleSignOut;
