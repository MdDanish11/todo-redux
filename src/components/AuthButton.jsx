// src/components/AuthButton.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../redux/authSlice';

const AuthButton = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleAuth = () => {
    if (isAuthenticated) {
      dispatch(logout());
    } else {
      dispatch(login());
    }
  };

  return (
    <button onClick={handleAuth}>
      {isAuthenticated ? 'Logout' : 'Login'}
    </button>
  );
};

export default AuthButton;
