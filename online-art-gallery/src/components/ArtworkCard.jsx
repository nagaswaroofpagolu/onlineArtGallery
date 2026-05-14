import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArtworkModal from './ArtworkModal';
import { isLoggedIn } from '../utils/auth';
import '../styles/artwork-card.css';

export default function ArtworkCard({ art }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // 🔐 Handle viewing artwork with login check
  const handleViewDetails = () => {
    if (!isLoggedIn()) {
      alert('Please login to view artwork details.');
      navigate('/login');
      return;
    }
    setShowModal(true);
  };

  return (
    <>
      <div className="artwork-card">
        <img src={art.image} alt={art.title} />
        <h3>{art.title}</h3>
        <p><strong>Artist:</strong> {art.artist}</p>
        <div className="price">₹{art.price}</div>
        <div className="artwork-actions">
          <button 
            className="artwork-btn primary"
            onClick={handleViewDetails}
            title={!isLoggedIn() ? "Login required to view details" : "View artwork details"}
          >
            View Details
          </button>
        </div>
      </div>

      {/* 🔐 Double-check: Only render modal if logged in */}
      {showModal && isLoggedIn() && (
        <ArtworkModal 
          artwork={art}
          show={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
