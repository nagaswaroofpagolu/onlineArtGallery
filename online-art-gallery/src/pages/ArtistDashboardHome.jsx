import React, { useState } from 'react';
import { useArt } from '../contexts/ArtContext';
import '../styles/dashboard.css';
import '../styles/artwork-card.css';

export default function ArtistDashboardHome() {
  const { getMyArtworks, deleteArtwork, updateArtwork, getMyOrders } = useArt();
  const myArtworks = getMyArtworks();
  const myOrders = getMyOrders();
  const [editingArtwork, setEditingArtwork] = useState(null);

  const handleUpdateArtwork = (e) => {
    e.preventDefault();
    updateArtwork(editingArtwork.id, editingArtwork);
    setEditingArtwork(null);
  };

  const handleDelete = (artworkId) => {
    if (window.confirm('Are you sure you want to delete this artwork?')) {
      deleteArtwork(artworkId);
    }
  };

  return (
    <div>
      <h3 className="section-title">My Artworks</h3>

      <div className="artworks-grid">
        {myArtworks.map(art => (
          <div key={art.id} className="artwork-card">
            <img src={art.image} alt={art.title} />
            <h3>{art.title}</h3>
            <p>{art.description}</p>
            <p>Price: ₹{art.price}</p>
            <p>Stock: {art.quantity}</p>
            <div className="artwork-actions">
              <button onClick={() => setEditingArtwork(art)} className="artwork-btn secondary">Edit</button>
              <button onClick={() => handleDelete(art.id)} className="artwork-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editingArtwork && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Artwork</h3>
            <form onSubmit={handleUpdateArtwork}>
              <input
                type="text"
                value={editingArtwork.title}
                onChange={e => setEditingArtwork({ ...editingArtwork, title: e.target.value })}
              />
              <textarea
                value={editingArtwork.description}
                onChange={e => setEditingArtwork({ ...editingArtwork, description: e.target.value })}
              />
              <input
                type="number"
                value={editingArtwork.price}
                onChange={e => setEditingArtwork({ ...editingArtwork, price: e.target.value })}
              />
              <input
                type="number"
                value={editingArtwork.quantity}
                onChange={e => setEditingArtwork({ ...editingArtwork, quantity: e.target.value })}
              />
              <input
                type="url"
                value={editingArtwork.image}
                onChange={e => setEditingArtwork({ ...editingArtwork, image: e.target.value })}
              />
              <div className="modal-actions">
                <button type="submit" className="artwork-btn primary">Save Changes</button>
                <button type="button" onClick={() => setEditingArtwork(null)} className="artwork-btn secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
