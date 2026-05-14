import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container" style={{ textAlign: 'center', padding: '20px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role-specific shortcuts using booleans from AuthContext
  if (requiredRole) {
    const r = requiredRole.toLowerCase();
    if (r === 'artist' && !user.isArtist) {
      return <Navigate to="/" replace />;
    }
    if (r === 'customer' && !user.isCustomer) {
      return <Navigate to="/" replace />;
    }
    if (r === 'admin' && !user.isAdmin) {
      return <Navigate to="/" replace />;
    }
    // fallback to substring check for other roles
    if (!['artist', 'customer', 'admin'].includes(r)) {
      if (!user.role || !user.role.toLowerCase().includes(r)) {
        console.log('Access denied. Required role:', requiredRole, 'User role:', user.role);
        return <Navigate to="/" replace />;
      }
    }
  }

  return <>{children}</>;
}
