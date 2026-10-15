import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldAlert, 
  Video, 
  LogIn, 
  LogOut, 
  UserPlus, 
  User as UserIcon, 
  Mail,
  ShieldCheck
} from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-400 text-slate-950 font-bold shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white group-hover:text-teal-400 transition-colors">
                  AegisVision <span className="text-teal-400">AI</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  Surveillance System
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Automated Violence Detection</p>
            </div>
          </Link>

          {/* Navigation Links & Auth Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'text-teal-400 bg-slate-900 border border-teal-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              Overview
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/detect"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === '/detect'
                      ? 'text-teal-400 bg-slate-900 border border-teal-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <Video className="w-4 h-4 text-teal-400" />
                  <span>Detection Studio</span>
                </Link>

                <div className="h-5 w-px bg-slate-800 mx-1 hidden sm:block"></div>

                {/* Logged in User Profile Pill */}
                <div 
                  className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-200"
                  title={`Logged in as ${user?.username} (${user?.email || 'No email'}) • User ID: #${user?.userId || 'N/A'}`}
                >
                  <div className="w-6 h-6 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300 font-bold">
                    {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-teal-300 block leading-tight">{user?.username}</span>
                    {user?.userId && (
                      <span className="text-[10px] text-slate-500 font-mono block">ID: #{user.userId}</span>
                    )}
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all cursor-pointer"
                  title="Sign out of system"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === '/login'
                      ? 'text-teal-400 bg-slate-900 border border-teal-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  Sign In
                </Link>

                <Link
                  to="/register"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 hover:brightness-110 shadow-lg shadow-teal-500/25 transition-all"
                >
                  <UserPlus className="w-4 h-4 stroke-[2.5]" />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
