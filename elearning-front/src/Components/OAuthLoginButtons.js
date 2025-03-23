import { Button , Stack } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

const GoogleLoginButton = () => {
  const handleLogin = () => {
    // Redirect user đến backend để login
    window.location.href = process.env.REACT_APP_BACKEND_URL+'/api/auth_google/google';
    // window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <Button
      variant="contained"
      startIcon={<GoogleIcon />}
      onClick={handleLogin}
    >
      Google
    </Button>
  );
};

const FacebookLoginButton = () => {
  const handleLogin = () => {
    // Redirect user đến backend để login
    window.location.href = process.env.REACT_APP_BACKEND_URL+'/api/auth_facebook/facebook';
    // window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <Button
      variant="contained"
      startIcon={<FacebookIcon />}
      onClick={handleLogin}
    >
      Facebook
    </Button>
  );
};


const OAuthLoginButtons = () => {


  return (
    <Stack direction="row" spacing={3} justifyContent="center">
      <GoogleLoginButton />
      <FacebookLoginButton />
    </Stack>
  );
};

export default OAuthLoginButtons;
