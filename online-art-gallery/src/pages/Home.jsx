import { Link } from "react-router-dom";
import "../styles/home.css";


export default function Home() {
  return (
    <div className="home-container">
      {/* ===== Hero Section ===== */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to the Online Art Gallery</h1>
          <p className="hero-text">
            Discover, showcase, and celebrate creativity. Artists can upload their masterpieces,
            while art lovers explore, collect, and connect with art from around the world.
          </p>
          <Link to="/artworks" className="hero-btn">🎨 Explore Gallery</Link>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=800&q=80"
            alt="Art Display"
          />
        </div>
      </section>
    </div>
  );
}
