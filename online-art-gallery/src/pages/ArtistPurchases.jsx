import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usePurchase } from '../contexts/PurchaseContext';
import '../styles/dashboard.css';

export default function ArtistPurchases() {
  const { user } = useAuth();
  const { getUserPurchases } = usePurchase();
  const myPurchases = getUserPurchases(user?.email || '');

  return (
    <div>
      <h3 className="section-title">My Purchases</h3>
      <div className="purchases-grid">
        {myPurchases.length === 0 ? (
          <p>No purchases yet.</p>
        ) : (
          myPurchases.map(p => (
            <div key={p.payment?.paymentId || p.purchasedAt} className="purchase-card">
              <img src={p.artwork.image} alt={p.artwork.title} />
              <h3>{p.artwork.title}</h3>
              <p>By {p.artwork.artist}</p>
              <p>Price: ₹{p.artwork.price}</p>
              <p>Date: {new Date(p.purchasedAt).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
