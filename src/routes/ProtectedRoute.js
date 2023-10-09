import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAdmin }) => {
  return isAdmin ? <Outlet /> : <Navigate to="/not-authorized" />;
};

export default ProtectedRoute;
