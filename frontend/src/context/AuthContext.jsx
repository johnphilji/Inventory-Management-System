import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Set default axios header
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      localStorage.setItem('token', token);
      if (!user) loadUser();
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
      localStorage.removeItem('token');
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  const loadUser = async () => {
    try {
      const res = await axios.get('/api/auth/me');
      setUser(res.data);
    } catch (err) {
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    const res = await axios.post('/api/auth/register', formData);
    const newToken = res.data.token;
    setToken(newToken);
    axios.defaults.headers.common['x-auth-token'] = newToken;
    localStorage.setItem('token', newToken);
    await loadUser();
  };

  const login = async (formData) => {
    const res = await axios.post('/api/auth/login', formData);
    const newToken = res.data.token;
    setToken(newToken);
    axios.defaults.headers.common['x-auth-token'] = newToken;
    localStorage.setItem('token', newToken);
    await loadUser();
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
