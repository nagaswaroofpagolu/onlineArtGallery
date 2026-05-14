import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ArtContext = createContext(null);

export const ArtProvider = ({ children }) => {
  const { user } = useAuth();
  const [artworks, setArtworks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load stored artworks and orders from localStorage
    const storedArtworks = localStorage.getItem('artworks');
    const storedOrders = localStorage.getItem('orders');
    
    if (storedArtworks) setArtworks(JSON.parse(storedArtworks));
    if (storedOrders) setOrders(JSON.parse(storedOrders));
    
    setLoading(false);
  }, []);

  // Save to localStorage whenever artworks or orders change
  useEffect(() => {
    localStorage.setItem('artworks', JSON.stringify(artworks));
  }, [artworks]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addArtwork = (artwork) => {
    const newArtwork = {
      ...artwork,
      id: Date.now().toString(),
      artistId: user.id,
      createdAt: new Date().toISOString(),
    };
    setArtworks(prev => [...prev, newArtwork]);
    return newArtwork;
  };

  const updateArtwork = (id, updates) => {
    setArtworks(prev => prev.map(art => 
      art.id === id ? { ...art, ...updates, updatedAt: new Date().toISOString() } : art
    ));
  };

  const deleteArtwork = (id) => {
    setArtworks(prev => prev.filter(art => art.id !== id));
  };

  const purchaseArtwork = (artworkId, quantity) => {
    const artwork = artworks.find(art => art.id === artworkId);
    if (!artwork) return null;

    const order = {
      id: Date.now().toString(),
      artworkId,
      customerId: user.id,
      quantity,
      price: artwork.price,
      total: artwork.price * quantity,
      createdAt: new Date().toISOString(),
    };

    setOrders(prev => [...prev, order]);
    return order;
  };

  const getMyArtworks = () => {
    return artworks.filter(art => art.artistId === user?.id);
  };

  const getMyOrders = () => {
    return orders.filter(order => order.customerId === user?.id);
  };

  const getAllArtworks = () => {
    return artworks;
  };

  const value = {
    artworks,
    orders,
    loading,
    addArtwork,
    updateArtwork,
    deleteArtwork,
    purchaseArtwork,
    getMyArtworks,
    getMyOrders,
    getAllArtworks,
  };

  return <ArtContext.Provider value={value}>{children}</ArtContext.Provider>;
};

export const useArt = () => {
  const context = useContext(ArtContext);
  if (!context) {
    throw new Error('useArt must be used within an ArtProvider');
  }
  return context;
};