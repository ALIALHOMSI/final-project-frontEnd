import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css'

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the authentication token from session storage
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('Role');
    sessionStorage.removeItem('fullName');
    sessionStorage.removeItem('email');

    // Redirect the user to the login page
    navigate('/login');
  };

  return (
    <button className='logout'   onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;