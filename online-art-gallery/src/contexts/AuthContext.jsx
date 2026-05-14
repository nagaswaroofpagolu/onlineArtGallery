import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiUrl } from '../config/api';
import { ROLES, STORAGE_KEYS, getRoleBasedDashboard, isValidRole } from '../constants';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing auth data
    const userData = localStorage.getItem(STORAGE_KEYS.USER);
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        console.log('Stored user data:', parsed);
        
        if (!parsed.role || !isValidRole(parsed.role)) {
          throw new Error('Invalid role in stored user data');
        }
        
        const userRole = parsed.role.toUpperCase();
        const enhanced = {
          ...parsed,
          role: userRole,
          isArtist: userRole === ROLES.ARTIST,
          isCustomer: userRole === ROLES.CUSTOMER,
          isAdmin: userRole === ROLES.ADMIN
        };
        
        console.log('Enhanced user data:', enhanced);
        setUser(enhanced);
      } catch (e) {
        console.error('Error parsing stored user data:', e);
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await fetch(getApiUrl('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        const txt = await res.text();
        setLoading(false);
        throw new Error(txt || 'Login failed');
      }

      const data = await res.json();
      console.log('Login response:', data); // Debug log

      const userRole = (data.role || '').toUpperCase();
      console.log('Normalized login role:', userRole); // Debug log
      
      const enhancedUser = {
        ...data,
        role: userRole,
        isArtist: userRole === 'ARTIST',
        isCustomer: userRole === 'CUSTOMER',
        isAdmin: userRole === 'ADMIN'
      };

      // 🔐 CRITICAL FIX: Save token separately to localStorage
      if (data.token) {
        localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
        console.log('✅ Token saved to localStorage');
      } else {
        console.error('⚠️ Warning: No token in login response');
      }

      setUser(enhancedUser);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(enhancedUser));

      // Then handle navigation based on role (artist => artist dashboard)
      if (enhancedUser.isArtist) {
        console.log('Navigating to artist dashboard'); // Debug log
        navigate('/artist-dashboard');
      } else {
        console.log('Navigating to customer dashboard'); // Debug log
        navigate('/customer-dashboard');
      }
    } catch (err) {
      console.error('Login error', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    // 🔐 CRITICAL FIX: Remove both user and token from localStorage
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    console.log('🚪 Logged out - token and user cleared');
    navigate('/login');
  };

  const signup = async (userData) => {
    setLoading(true);
    try {
      if (!userData.role || !isValidRole(userData.role)) {
        throw new Error('Invalid role selected');
      }

      const signupData = {
        ...userData,
        role: userData.role.toUpperCase()
      };

      console.log('Attempting signup:', {
        url: getApiUrl('/api/auth/signup'),
        data: signupData
      });
      
      const res = await fetch(getApiUrl('/api/auth/signup'), {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(signupData),
        credentials: 'include'
      });

      console.log('Signup response status:', res.status);

      if (!res.ok) {
        const contentType = res.headers.get('content-type');
        let errorData;
        
        try {
          if (contentType && contentType.includes('application/json')) {
            errorData = await res.json();
            console.log('Error response:', errorData);
            throw new Error(errorData.message || 'Registration failed');
          } else {
            const text = await res.text();
            console.log('Error text:', text);
            throw new Error('Registration failed: Server error');
          }
        } catch (parseError) {
          console.error('Error parsing response:', parseError);
          throw new Error('Registration failed: Invalid server response');
        }
      }

      const data = await res.json();
      console.log('Signup response:', data);
      
      if (!data.role || !isValidRole(data.role)) {
        throw new Error('Invalid role in server response');
      }

      const userRole = data.role.toUpperCase();
      const enhancedUser = {
        ...data,
        role: userRole,
        isArtist: userRole === ROLES.ARTIST,
        isCustomer: userRole === ROLES.CUSTOMER,
        isAdmin: userRole === ROLES.ADMIN
      };
      
      // 🔐 CRITICAL FIX: Save token separately to localStorage
      if (data.token) {
        localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
        console.log('✅ Token saved to localStorage after signup');
      } else {
        console.error('⚠️ Warning: No token in signup response');
      }
      
      console.log('Enhanced user:', enhancedUser);
      setUser(enhancedUser);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(enhancedUser));

      // Navigate to the appropriate dashboard based on role
      const dashboardRoute = getRoleBasedDashboard(userRole);
      console.log('Navigating to:', dashboardRoute);
      navigate(dashboardRoute);
    } catch (err) {
      console.error('Registration error', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    login,
    logout,
    loading,
    signup,
    // convenience flags for components
    isArtist: user?.isArtist || false,
    isCustomer: user?.isCustomer || false,
    isAdmin: user?.isAdmin || false,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};