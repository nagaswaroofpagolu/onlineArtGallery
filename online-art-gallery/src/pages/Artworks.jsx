import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useArt } from "../contexts/ArtContext";
import { useAuth } from "../contexts/AuthContext";
import { usePurchase } from "../contexts/PurchaseContext";
import { buyArtwork } from "../utils/payment";
import { isLoggedIn } from "../utils/auth";
import "../styles/Artworks.css";

const FEATURED_ARTWORKS = [
  {
    id: "featured-1",
    title: "Dance of Colors",
    artist: "Maya Patel",
    price: 2500,
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&w=500",
    description: "A vibrant abstract piece exploring the harmony of colors in motion.",
    featured: true,
  },
  {
    id: "featured-2",
    title: "Beauty of Sunset",
    artist: "Maya Patel",
    price: 2500,
    image: "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&w=500",
    description: "Warm evening light captured in a peaceful landscape study.",
    featured: true,
  },
  {
    id: "featured-3",
    title: "Mountain Beauty",
    artist: "Raj Kumar",
    price: 3200,
    image: "https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&w=500",
    description: "A contemporary interpretation of mountain air and distance.",
    featured: true,
  },
  {
    id: "featured-4",
    title: "Serenity Garden",
    artist: "Priya Singh",
    price: 2800,
    image: "https://images.unsplash.com/photo-1582201942988-13e60e4556ee?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&w=500",
    description: "A peaceful garden scene painted in a traditional watercolor style.",
    featured: true,
  },
];

export default function Artworks() {
  const [selectedArt, setSelectedArt] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getAllArtworks, purchaseArtwork } = useArt();
  const { addPurchase } = usePurchase();
  const dynamicArtworks = getAllArtworks();
  const artworks = [
    ...FEATURED_ARTWORKS,
    ...dynamicArtworks.filter((art) => !FEATURED_ARTWORKS.some((featured) => featured.id === art.id)),
  ];

  const handleProtectedAction = (action, actionName = "view or buy") => {
    if (!isLoggedIn()) {
      alert(`Please login to ${actionName} this artwork.`);
      navigate("/login");
      return;
    }

    action();
  };

  const handleViewArtwork = (art) => {
    handleProtectedAction(() => {
      setSelectedArt(art);
    }, "view");
  };

  const handlePurchase = async (art) => {
    if (!isLoggedIn()) {
      alert("Please login to continue your purchase.");
      navigate("/login");
      return;
    }

    const handleSuccess = ({ response }) => {
      purchaseArtwork(art.id, 1);

      addPurchase({
        userEmail: user?.email || "guest@example.com",
        purchasedAt: new Date().toISOString(),
        payment: {
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
        },
        artwork: {
          id: art.id,
          title: art.title,
          artist: art.artist,
          price: art.price,
          image: art.image,
          description: art.description,
        },
      });

      alert("Payment successful and recorded.");
      if (selectedArt) setSelectedArt(null);
    };

    const handleError = (err) => {
      console.error("Payment error", err);
      alert(`Payment failed: ${err?.message || "Unknown error"}`);
    };

    buyArtwork({ art, user, onSuccess: handleSuccess, onError: handleError });
  };

  return (
    <div className="artworks-page">
      <h2>Artworks</h2>
      <div className="artworks-grid">
        {artworks.map((art) => (
          <div key={art.id} className="artwork-card">
            <div className="artwork-img-wrap">
              <img src={art.image} alt={art.title} />
              <div className="artwork-overlay">
                <button
                  className="btn-view"
                  onClick={() => handleViewArtwork(art)}
                  title={!isLoggedIn() ? "Login required to view details" : "View artwork details"}
                >
                  View
                </button>
                <button
                  className="btn-buy"
                  onClick={() => handlePurchase(art)}
                  title={!isLoggedIn() ? "Login required to purchase" : "Buy this artwork"}
                >
                  Buy
                </button>
              </div>
            </div>
            <div className="artwork-card-content">
              <h5>{art.title}</h5>
              <p>By {art.artist}</p>
              <p className="artwork-price">Rs. {art.price}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedArt && isLoggedIn() && (
        <div className="art-modal-backdrop" onClick={() => setSelectedArt(null)}>
          <div className="art-modal" onClick={(e) => e.stopPropagation()}>
            <button className="art-modal-close" onClick={() => setSelectedArt(null)} aria-label="Close">
              x
            </button>
            <div className="art-modal-image">
              <img src={selectedArt.image} alt={selectedArt.title} />
            </div>
            <div className="art-modal-details">
              <h3>{selectedArt.title}</h3>
              <p className="artist">By {selectedArt.artist}</p>
              <p className="description">{selectedArt.description}</p>
              <p className="price">Price: Rs. {selectedArt.price}</p>
              <button
                className="gold-btn"
                onClick={() => handlePurchase(selectedArt)}
                title={!isLoggedIn() ? "Login required to purchase" : "Buy this artwork"}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
