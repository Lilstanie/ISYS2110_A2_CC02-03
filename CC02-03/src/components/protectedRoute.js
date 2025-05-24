import React from 'react';
import { Navigate } from 'react-router-dom';


// Used to protect routes based on user role

function ProtectedRoute({ element: Component, requiredRole }) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.role === requiredRole ? <Component /> : <Navigate to={`/home/${user.role || 'user'}`} />;
}

export default ProtectedRoute;
