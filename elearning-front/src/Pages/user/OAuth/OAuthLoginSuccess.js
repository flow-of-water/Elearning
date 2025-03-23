// src/pages/LoginSuccess.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GoogleLoginSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const username = params.get('username');
    const userid = params.get('userid');
    const role = params.get('role')
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('userId' , userid) ;
      localStorage.setItem('userRole' , role) ;
      navigate('/');
    }
  }, []);

  return <div>Login...</div>;
}
