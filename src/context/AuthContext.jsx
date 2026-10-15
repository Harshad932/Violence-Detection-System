import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('vds_jwt_token') || null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Validate existing token and retrieve user profile on mount
  useEffect(() => {
    let isMounted = true;

    async function initializeAuth() {
      const savedToken = localStorage.getItem('vds_jwt_token');

      if (!savedToken) {
        if (isMounted) {
          setUser(null);
          setIsLoading(false);
        }
        return;
      }

      try {
        const profile = await api.getCurrentUser(savedToken);
        if (isMounted) {
          setUser(profile);
          setToken(savedToken);
        }
      } catch (err) {
        console.warn('Saved JWT token is invalid or expired:', err.message);
        // If unauthorized or invalid token, clean up
        if (err.status === 401 || err.status === 403) {
          localStorage.removeItem('vds_jwt_token');
          if (isMounted) {
            setToken(null);
            setUser(null);
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    initializeAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * Log in user: gets JWT token then retrieves user profile
   */
  const login = async (username, password) => {
    const loginResponse = await api.login({ username, password });
    const jwtToken = loginResponse.token;

    if (!jwtToken) {
      throw new Error('Authentication succeeded but no JWT token was returned by the server.');
    }

    localStorage.setItem('vds_jwt_token', jwtToken);
    setToken(jwtToken);

    // Retrieve user profile with the token
    const profile = await api.getCurrentUser(jwtToken);
    setUser(profile);
    return profile;
  };

  /**
   * Register a new user account
   */
  const register = async (username, email, password) => {
    return await api.register({ username, email, password });
  };

  /**
   * Log out user and invalidate local state
   */
  const logout = () => {
    localStorage.removeItem('vds_jwt_token');
    setToken(null);
    setUser(null);
  };

  const value = {
    token,
    user,
    isAuthenticated: Boolean(token && user),
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
