import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 radial-bg">
      <Navbar />

      <main className="flex-1">
        <Routes>
          {/* Public Home Page */}
          <Route path="/" element={<Home />} />

          {/* Public Login Page (redirects to /detect if already logged in) */}
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/detect" replace /> : <Login />} 
          />

          {/* Public Register Page (redirects to /detect if already logged in) */}
          <Route 
            path="/register" 
            element={isAuthenticated ? <Navigate to="/detect" replace /> : <Register />} 
          />

          {/* Protected Video Upload and Detection Page */}
          <Route 
            path="/detect" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}
