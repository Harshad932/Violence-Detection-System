import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldAlert, ShieldCheck, Video, LogIn, LogOut, Activity } from 'lucide-react';

export default function Navbar({ isAuthenticated, onLogout }) {
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
                  v1.0 Mock
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Automated Violence Detection System</p>
            </div>
          </Link>

          {/* Nav links */}
          <div className="flex items-center gap-2 sm:gap-4">
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

                <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="font-mono text-teal-300">user1</span>
                </div>

                <button
                  onClick={onLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all"
                  title="Sign out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 hover:brightness-110 shadow-lg shadow-teal-500/25 transition-all"
              >
                <LogIn className="w-4 h-4 stroke-[2.5]" />
                <span>Portal Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
