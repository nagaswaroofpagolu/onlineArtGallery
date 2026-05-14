import React, { useEffect, useState } from 'react';
import '../styles/artwork-modal.css';

const ArtworkModal = ({ artwork, show, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!isVisible && !show) return null;

  return (
    <div className={`artwork-modal-overlay ${show ? 'show' : ''}`} onClick={onClose}>
      <div className={`artwork-modal ${show ? 'show' : ''}`} onClick={e => e.stopPropagation()}>
        <button className="artwork-modal-close" onClick={onClose}>
          <span>&times;</span>
        </button>
        
        <div className="artwork-modal-content">
          <div className="artwork-modal-image">
            <img src={artwork.image} alt={artwork.title} />
          </div>
          
          <div className="artwork-modal-details">
            <h2 className="artwork-modal-title">{artwork.title}</h2>
            <div className="artwork-modal-artist">By {artwork.artist}</div>
            <div className="artwork-modal-price">₹{artwork.price}</div>
            
            <p className="artwork-modal-description">{artwork.description}</p>
            
            <div className="artwork-modal-info">
              <div className="artwork-modal-info-item">
                <div className="artwork-modal-info-label">Category</div>
                <div className="artwork-modal-info-value">{artwork.category}</div>
              </div>
              <div className="artwork-modal-info-item">
                <div className="artwork-modal-info-label">Medium</div>
                <div className="artwork-modal-info-value">{artwork.medium}</div>
              </div>
              <div className="artwork-modal-info-item">
                <div className="artwork-modal-info-label">Dimensions</div>
                <div className="artwork-modal-info-value">{artwork.dimensions}</div>
              </div>
              <div className="artwork-modal-info-item">
                <div className="artwork-modal-info-label">Year</div>
                <div className="artwork-modal-info-value">{artwork.year}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkModal;