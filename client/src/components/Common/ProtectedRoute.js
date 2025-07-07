

// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, loading } = useAuth();

//   // Don't show loading for too long to avoid test timeouts
//   if (loading) {
//     return null; // Return null instead of loading component
//   }

//   return isAuthenticated ? children : <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;


import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Don't show loading screen to avoid test timeouts
  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
