import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ROLES, getRoleBasedDashboard } from '../constants';

export const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user.role?.toUpperCase();
  if (!allowedRoles.includes(userRole)) {
    // Redirect to their appropriate dashboard if logged in but wrong role
    return <Navigate to={getRoleBasedDashboard(userRole)} replace />;
  }

  return children;
};

export const CustomerRoute = ({ children }) => (
  <RoleProtectedRoute allowedRoles={[ROLES.CUSTOMER]}>
    {children}
  </RoleProtectedRoute>
);

export const ArtistRoute = ({ children }) => (
  <RoleProtectedRoute allowedRoles={[ROLES.ARTIST]}>
    {children}
  </RoleProtectedRoute>
);

export const AdminRoute = ({ children }) => (
  <RoleProtectedRoute allowedRoles={[ROLES.ADMIN]}>
    {children}
  </RoleProtectedRoute>
);

export default RoleProtectedRoute;