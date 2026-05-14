import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useArt } from "../contexts/ArtContext";
import { usePurchase } from "../contexts/PurchaseContext";
import "../styles/Profile.css";

export default function Profile() {
  const { user } = useAuth();
  const { getMyArtworks, getMyOrders } = useArt();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const myArtworks = getMyArtworks();
  const myOrders = getMyOrders();
  const { getUserPurchases } = usePurchase();
  const myPurchases = getUserPurchases(user?.email || '');

  const handleSave = () => {
    // In a real app, this would call an API
    localStorage.setItem("user", JSON.stringify(editedUser));
    setIsEditing(false);
  };

  if (!user) return <div>Please log in to view your profile.</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>My Profile</h2>
        {!isEditing && (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        )}
      </div>

      <div className="profile-content">
        <div className="profile-section">
          {isEditing ? (
            <div className="edit-form">
              <input
                type="text"
                value={editedUser.name}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, name: e.target.value })
                }
              />
              <input
                type="email"
                value={editedUser.email}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, email: e.target.value })
                }
              />
              <div className="edit-actions">
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <h3>Personal Information</h3>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.roleShort || user.role}</p>
              <p><strong>Member since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
            </>
          )}
        </div>

        {/* Show My Artworks section only for artists */}
        {user.isArtist && (
          <div className="profile-section">
            <h3>My Artworks</h3>
            <div className="artworks-grid">
              {myArtworks.length === 0 ? (
                <p>No artworks uploaded yet.</p>
              ) : (
                myArtworks.map((art) => (
                  <div key={art.id} className="artwork-card">
                    <img src={art.image} alt={art.title} />
                    <h4>{art.title}</h4>
                    <p>₹{art.price}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Show My Purchases for all users (from PurchaseContext) */}
        <div className="profile-section">
          <h3>My Purchased Artworks</h3>
          <div className="artworks-grid">
            {myPurchases.length === 0 ? (
              <p>No purchases yet.</p>
            ) : (
              myPurchases.map((p) => (
                <div key={p.payment?.paymentId || p.purchasedAt} className="artwork-card">
                  <img src={p.artwork.image} alt={p.artwork.title} />
                  <h4>{p.artwork.title}</h4>
                  <p>By {p.artwork.artist}</p>
                  <p>Price: ₹{p.artwork.price}</p>
                  <p className="small">Purchased: {new Date(p.purchasedAt).toLocaleDateString()}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
