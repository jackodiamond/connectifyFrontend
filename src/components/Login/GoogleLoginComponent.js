import React from 'react';
import GoogleLogin from 'react-google-login';

const clientId = '966194525011-ofeb7gv0v4coqfvupvh76sdv3bv9la0n.apps.googleusercontent.com'; // Replace with your actual Client ID

const GoogleLoginComponent = () => {
  const responseGoogle = (response) => {
    console.log(response.profileObj); // Access user profile information
    // Send the user profile information to your backend for further processing (e.g., authentication)
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginComponent;
