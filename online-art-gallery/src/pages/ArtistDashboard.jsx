import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/dashboard.css';

export default function ArtistDashboard() {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user?.name}</h2>

      <div className="dashboard-tabs">
        <NavLink to="/artist-dashboard" end className={({isActive}) => `tab-btn ${isActive? 'active':''}`}>
          My Artworks
        </NavLink>
        <NavLink to="/artist-dashboard/add" className={({isActive}) => `tab-btn ${isActive? 'active':''}`}>
          Add Artwork
        </NavLink>
        <NavLink to="/artist-dashboard/purchases" className={({isActive}) => `tab-btn ${isActive? 'active':''}`}>
          My Purchases
        </NavLink>
      </div>

      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
}