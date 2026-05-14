import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import "./styles/global.css";

import { AuthProvider } from './contexts/AuthContext';
import { PurchaseProvider } from './contexts/PurchaseContext';
import { ArtProvider } from './contexts/ArtContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Artworks from './pages/Artworks';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import MyGallery from './pages/MyGallery';
import Profile from './pages/Profile';
import ArtistDashboard from './pages/ArtistDashboard';
import ArtistDashboardHome from './pages/ArtistDashboardHome';
import ArtistAddArtwork from './pages/ArtistAddArtwork';
import ArtistPurchases from './pages/ArtistPurchases';
import CustomerDashboard from './pages/CustomerDashboard';
import AddArtwork from './pages/AddArtwork';
import { CustomerRoute, ArtistRoute } from './components/RoleProtectedRoute';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <PurchaseProvider>
            <ArtProvider>
            <div className="app-container d-flex flex-column">
              <Navbar />
              <main className="main-content">
                <div className="container-fluid px-0">
                  <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/artworks" element={<Artworks />} />
                  <Route path="/my-gallery" element={<MyGallery />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  {/* Artist Routes: nested under /artist-dashboard */}
                  <Route path="/artist-dashboard" element={
                    <ArtistRoute>
                      <ArtistDashboard />
                    </ArtistRoute>
                  }>
                    <Route index element={<ArtistDashboardHome />} />
                    <Route path="add" element={<ArtistAddArtwork />} />
                    <Route path="purchases" element={<ArtistPurchases />} />
                  </Route>
                  <Route path="/artist-profile" element={
                    <ArtistRoute>
                      <Profile />
                    </ArtistRoute>
                  } />
                  {/* legacy route kept for compatibility (optional) */}
                  <Route path="/add-artwork" element={
                    <ArtistRoute>
                      <ArtistAddArtwork />
                    </ArtistRoute>
                  } />
                  
                  {/* Customer Routes */}
                  <Route path="/customer-dashboard" element={
                    <CustomerRoute>
                      <CustomerDashboard />
                    </CustomerRoute>
                  } />
                  <Route path="/customer-profile" element={
                    <CustomerRoute>
                      <Profile />
                    </CustomerRoute>
                  } />
                </Routes>
              </div>
            </main>
            <Footer />
          </div>
        </ArtProvider>
      </PurchaseProvider>
      </AuthProvider>
    </Router>
  </ErrorBoundary>
  )
}

export default App
