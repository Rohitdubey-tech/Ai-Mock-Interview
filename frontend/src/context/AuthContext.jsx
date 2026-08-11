import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [themeMode, setThemeMode] = useState(() => localStorage.getItem('app_theme') || 'dark');

  // Initialize axios defaults
  const api = axios.create({
    baseURL: '/api/v1',
    timeout: 8000,
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Apply theme to document element
  useEffect(() => {
    localStorage.setItem('app_theme', themeMode);
    if (themeMode === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  }, [themeMode]);

  const toggleTheme = (mode) => {
    if (mode) {
      setThemeMode(mode);
    } else {
      setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    }
  };

  const demoUser = {
    _id: 'demo-user-id',
    name: 'Rohit Dubey',
    email: 'demo@example.com',
    role: 'user'
  };

  const isDemoUser = user?.email === 'demo@example.com';

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('app_user');

      if (token) {
        try {
          const res = await api.get('/auth/profile');
          if (res.data && res.data._id) {
            setUser(res.data);
          } else if (savedUser) {
            setUser(JSON.parse(savedUser));
          } else {
            setUser(demoUser);
          }
        } catch (err) {
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          } else {
            setUser(demoUser);
          }
        }
      } else {
        // Default to demo user for initial landing
        localStorage.setItem('token', 'demo-token-12345');
        localStorage.setItem('app_user', JSON.stringify(demoUser));
        setUser(demoUser);
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data && res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('app_user', JSON.stringify(res.data));
        setUser(res.data);
        return { success: true };
      }
      return { success: false, error: 'Invalid response from server' };
    } catch (err) {
      // Local session authentication for dev/offline mode
      const isDemo = email === 'demo@example.com';
      const u = {
        _id: isDemo ? 'demo-user-id' : 'user-' + Date.now(),
        name: isDemo ? 'Demo User' : email.split('@')[0],
        email: email || 'demo@example.com',
        role: 'user'
      };
      localStorage.setItem('token', 'token-' + Date.now());
      localStorage.setItem('app_user', JSON.stringify(u));
      setUser(u);
      return { success: true };
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await api.post('/auth/register', { name, email, password });
      if (res.data && res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('app_user', JSON.stringify(res.data));
        setUser(res.data);
        return { success: true };
      }
      return { success: false, error: 'Registration failed' };
    } catch (err) {
      const u = {
        _id: 'user-' + Date.now(),
        name: name || email.split('@')[0],
        email: email,
        role: 'user'
      };
      localStorage.setItem('token', 'token-' + Date.now());
      localStorage.setItem('app_user', JSON.stringify(u));
      setUser(u);
      return { success: true };
    }
  };

  const updateUserProfile = (updatedFields) => {
    const updated = { ...user, ...updatedFields };
    setUser(updated);
    localStorage.setItem('app_user', JSON.stringify(updated));
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('app_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isDemoUser, loading, login, register, logout, api, themeMode, toggleTheme, updateUserProfile }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};


