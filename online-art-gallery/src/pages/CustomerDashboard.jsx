import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useArt } from '../contexts/ArtContext';
import { usePurchase } from '../contexts/PurchaseContext';
import '../styles/dashboard.css';
import '../styles/artwork-card.css';

export default function CustomerDashboard() {
  const { user } = useAuth();
  const { getAllArtworks, getMyOrders, purchaseArtwork } = useArt();
  const [activeTab, setActiveTab] = useState('shop');
  const [purchasing, setPurchasing] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const allArtworks = getAllArtworks();
  const myOrders = getMyOrders();
  const { getUserPurchases } = usePurchase();
  const myPurchases = getUserPurchases(user?.email || '');

  const handlePurchase = (e) => {
    e.preventDefault();
    purchaseArtwork(purchasing.id, quantity);
    setPurchasing(null);
    setQuantity(1);
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user?.name}</h2>

      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'shop' ? 'active' : ''}`}
          onClick={() => setActiveTab('shop')}
        >
          Shop
        </button>
        <button 
          className={`tab-btn ${activeTab === 'myPurchases' ? 'active' : ''}`}
          onClick={() => setActiveTab('myPurchases')}
        >
          My Purchases
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'shop' && (
          <div className="artworks-grid">
            {allArtworks.map(art => (
              <div key={art.id} className="artwork-card">
                <img src={art.image} alt={art.title} />
                <h3>{art.title}</h3>
                <p>{art.description}</p>
                <p>Price: ₹{art.price}</p>
                <p>Available: {art.quantity}</p>
                <button 
                  onClick={() => setPurchasing(art)}
                  disabled={art.quantity < 1}
                >
                  {art.quantity < 1 ? 'Out of Stock' : 'Buy Now'}
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'myPurchases' && (
          <div className="purchases-grid">
            {myPurchases.length === 0 ? (
              <p>No purchases yet.</p>
            ) : (
              myPurchases.map(p => (
                <div key={p.payment?.paymentId || p.purchasedAt} className="purchase-card">
                  <img src={p.artwork.image} alt={p.artwork.title} />
                  <h3>{p.artwork.title}</h3>
                  <p>By {p.artwork.artist}</p>
                  <p>Total: ₹{p.artwork.price}</p>
                  <p>Date: {new Date(p.purchasedAt).toLocaleDateString()}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {purchasing && (
        <div className="modal">
          <div className="modal-content">
            <h3>Purchase Artwork</h3>
            <form onSubmit={handlePurchase}>
              <div className="artwork-preview">
                <img src={purchasing.image} alt={purchasing.title} />
                <h4>{purchasing.title}</h4>
                <p>Price: ₹{purchasing.price}</p>
              </div>
              <div className="quantity-input">
                <label>Quantity:</label>
                <input
                  type="number"
                  min="1"
                  max={purchasing.quantity}
                  value={quantity}
                  onChange={e => setQuantity(parseInt(e.target.value))}
                />
              </div>
              <p className="total">Total: ₹{purchasing.price * quantity}</p>
              <div className="modal-actions">
                <button type="submit">Confirm Purchase</button>
                <button type="button" onClick={() => setPurchasing(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}