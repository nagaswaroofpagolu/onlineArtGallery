import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Curated originals, open every day</p>
          <h1 className="hero-title">Online Art Gallery</h1>
          <p className="hero-text">
            Discover expressive paintings, collect work from emerging artists, and give creators
            a polished space to present new pieces.
          </p>
          <div className="hero-actions">
            <Link to="/artworks" className="hero-btn primary">
              Explore Gallery
            </Link>
            <Link to="/signup" className="hero-btn secondary">
              Join as Artist
            </Link>
          </div>
        </div>

        <div className="hero-gallery" aria-label="Featured artwork preview">
          <img
            className="hero-img hero-img-large"
            src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=900&q=80"
            alt="Colorful contemporary painting in a gallery"
          />
          <img
            className="hero-img hero-img-small"
            src="https://images.unsplash.com/photo-1545987796-200677ee1011?auto=format&fit=crop&w=520&q=80"
            alt="Visitors viewing framed artwork"
          />
        </div>
      </section>

      <section className="home-feature-band">
        <div>
          <span>For collectors</span>
          <strong>Browse by mood, artist, and price.</strong>
        </div>
        <div>
          <span>For artists</span>
          <strong>Upload, price, and manage your artworks.</strong>
        </div>
        <div>
          <span>For everyone</span>
          <strong>A calm, focused viewing experience.</strong>
        </div>
      </section>
    </div>
  );
}
