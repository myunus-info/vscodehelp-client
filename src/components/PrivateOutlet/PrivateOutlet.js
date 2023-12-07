import React from 'react';
import useAuth from '../hook/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateOutlet = () => {
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="/user/login" />;
};

export default PrivateOutlet;
