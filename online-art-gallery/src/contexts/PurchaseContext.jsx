import { createContext, useContext, useEffect, useState } from 'react';

const PurchaseContext = createContext(null);

export const PurchaseProvider = ({ children }) => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('userPurchases');
      if (raw) setPurchases(JSON.parse(raw));
    } catch (e) {
      console.error('Failed to load purchases from localStorage', e);
      setPurchases([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('userPurchases', JSON.stringify(purchases));
    } catch (e) {
      console.error('Failed to save purchases to localStorage', e);
    }
  }, [purchases]);

  const getUserPurchases = (email) => {
    if (!email) return [];
    return purchases.filter(p => p.userEmail === email);
  };

  const addPurchase = (purchase) => {
    setPurchases(prev => [purchase, ...prev]);
  };

  const value = { purchases, getUserPurchases, addPurchase };

  return <PurchaseContext.Provider value={value}>{children}</PurchaseContext.Provider>;
};

export const usePurchase = () => {
  const ctx = useContext(PurchaseContext);
  if (!ctx) throw new Error('usePurchase must be used within PurchaseProvider');
  return ctx;
};
