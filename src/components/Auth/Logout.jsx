import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css'
import logOutIcon from '../../assets/logouticon.png'

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
    window.location.reload();
  };

  return (
    <button className='logout'   onClick={handleLogout}>
      Logout
      <img className='log-out-icon' src={logOutIcon} alt="" />
    </button>
    
  );
};

export default LogoutButton;