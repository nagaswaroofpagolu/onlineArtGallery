import React, { useState } from 'react';
import { useArt } from '../contexts/ArtContext';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';

export default function ArtistAddArtwork() {
  const { addArtwork } = useArt();
  const navigate = useNavigate();
  const [newArtwork, setNewArtwork] = useState({ title: '', description: '', price: '', quantity: '', image: '' });

  const handleAddArtwork = (e) => {
    e.preventDefault();
    addArtwork({ ...newArtwork, price: parseFloat(newArtwork.price || 0), quantity: parseInt(newArtwork.quantity || 0) });
    setNewArtwork({ title: '', description: '', price: '', quantity: '', image: '' });
    // Redirect back to artist dashboard home after upload
    navigate('/artist-dashboard');
    // Optional short confirmation
    setTimeout(() => {
      try { window.toast && window.toast('Artwork uploaded successfully'); } catch(e) {}
    }, 300);
  };

  return (
    <div className="form-panel">
      <form className="artwork-form" onSubmit={handleAddArtwork}>
        <h3 className="form-title">Add New Artwork</h3>

        <div className="input-group">
          <label>Title</label>
          <input type="text" value={newArtwork.title} onChange={e => setNewArtwork({ ...newArtwork, title: e.target.value })} required />
        </div>

        <div className="input-group">
          <label>Description</label>
          <textarea value={newArtwork.description} onChange={e => setNewArtwork({ ...newArtwork, description: e.target.value })} required />
        </div>

        <div className="form-row">
          <div className="input-group">
            <label>Price (₹)</label>
            <input type="number" value={newArtwork.price} onChange={e => setNewArtwork({ ...newArtwork, price: e.target.value })} required />
          </div>
          <div className="input-group">
            <label>Quantity</label>
            <input type="number" value={newArtwork.quantity} onChange={e => setNewArtwork({ ...newArtwork, quantity: e.target.value })} required />
          </div>
        </div>

        <div className="input-group image-upload">
          <label className="upload-label">
            <input type="file" accept="image/*" onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                if (file.size > 5 * 1024 * 1024) { alert('Please upload an image smaller than 5MB.'); return; }
                const reader = new FileReader();
                reader.onload = () => setNewArtwork({ ...newArtwork, image: reader.result });
                reader.readAsDataURL(file);
              }
            }} />
            <div className="upload-area">
              <span className="upload-text">Choose image</span>
              <span className="upload-hint">JPG, PNG — max 5MB</span>
            </div>
          </label>
          {newArtwork.image && (<div className="preview-wrap"><img src={newArtwork.image} alt="preview" className="preview-img"/></div>)}
        </div>

        <button type="submit" className="submit-btn">Upload Artwork</button>
      </form>
    </div>
  );
}
