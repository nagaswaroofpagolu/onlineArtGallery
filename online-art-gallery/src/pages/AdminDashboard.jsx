import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import '../styles/dashboard.css';

export default function AdminDashboard() {
  const { user } = useAuth();

  // Redirect if not logged in or not an admin
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (!user || !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2>User Management</h2>
          {/* User management content will go here */}
        </div>
        <div className="dashboard-section">
          <h2>Artwork Management</h2>
          {/* Artwork management content will go here */}
        </div>
        <div className="dashboard-section">
          <h2>Order Management</h2>
          {/* Order management content will go here */}
        </div>
        <div className="dashboard-section">
          <h2>System Statistics</h2>
          {/* Statistics content will go here */}
        </div>
      </div>
    </div>
  );
}