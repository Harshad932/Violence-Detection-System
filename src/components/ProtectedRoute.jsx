import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert } from 'lucide-react';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="relative w-12 h-12">
          <div className="w-12 h-12 rounded-full border-2 border-teal-500/20 border-t-teal-400 animate-spin"></div>
          <ShieldAlert className="w-5 h-5 text-teal-400 absolute inset-0 m-auto" />
        </div>
        <p className="text-xs font-mono text-slate-400">Verifying security session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
