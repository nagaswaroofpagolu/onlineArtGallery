import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedArtistRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  // Use isArtist flag derived from AuthContext
  if (!user.isArtist) {
    return <Navigate to="/customer-dashboard" replace />;
  }

  return children;
}