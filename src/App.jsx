import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('vds_auth') !== null;
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('vds_auth');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('vds_auth', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('vds_auth');
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 radial-bg">
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
            
            <Route 
              path="/login" 
              element={
                isAuthenticated ? (
                  <Navigate to="/detect" replace />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              } 
            />

            <Route 
              path="/detect" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Dashboard user={user} />
                </ProtectedRoute>
              } 
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
