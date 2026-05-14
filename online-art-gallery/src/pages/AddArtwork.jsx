import React, { useState, useEffect } from "react";
import "../styles/global.css";
import "../styles/addArtwork.css";
import { useAuth } from "../contexts/AuthContext";

export default function AddArtwork() {
  const [artwork, setArtwork] = useState({ title: "", description: "", price: "", image: "" });
  const [artworks, setArtworks] = useState(() => {
    const saved = localStorage.getItem("artworks");
    return saved ? JSON.parse(saved) : [];
  });

  const handleChange = (e) => {
    // support file upload for image input
    if (e.target.type === "file") {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("Please upload an image smaller than 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setArtwork({ ...artwork, image: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      setArtwork({ ...artwork, [e.target.name]: e.target.value });
    }
  };

  const { user } = useAuth();

  const handleAdd = (e) => {
    e.preventDefault();
    if (!user || !user.isArtist) {
      alert("Only artists can add artworks!");
      return;
    }

    const newArt = {
      ...artwork,
      id: Date.now(),
      artist: user.name,
    };

    const updated = [...artworks, newArt];
    setArtworks(updated);
    localStorage.setItem("artworks", JSON.stringify(updated));

    alert("Artwork added successfully!");
    setArtwork({ title: "", description: "", price: "", image: "" });
  };

  return (
    <div className="form-page">
      <form className="art-form" onSubmit={handleAdd}>
        <h2 className="page-title">🖼️ Upload Your Artwork</h2>
        <input type="text" name="title" placeholder="Title" value={artwork.title} onChange={handleChange} required />
        {/* image upload input (file) */}
        <div className="input-group image-upload">
          <label className="upload-label">
            <input type="file" name="image" accept="image/*" onChange={handleChange} required />
            <span className="upload-text">Choose image</span>
            <span className="upload-hint">JPG, PNG — max 5MB</span>
          </label>
          {artwork.image ? (
            <div className="preview-wrap">
              <img src={artwork.image} alt="preview" className="preview-img" />
            </div>
          ) : null}
        </div>
        <textarea name="description" placeholder="Description" value={artwork.description} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={artwork.price} onChange={handleChange} required />
        <button className="gold-btn" type="submit">Add Artwork</button>
      </form>
    </div>
  );
}
