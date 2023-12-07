import React, { useContext } from 'react';
import AuthContext from '../context/auth-context';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const auth = useContext(AuthContext);
  const isAuth = auth.isLoggedIn;
  const isEmailVerified = auth.user.isEmailVerified;

  return isAuth && isEmailVerified ? children : <Navigate to="/user/authorization" />;
};

export default PrivateRoute;
