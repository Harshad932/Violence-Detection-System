import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Lock, User, AlertCircle, ArrowRight, Eye, EyeOff, Sparkles } from 'lucide-react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/detect';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Normalize input
    const trimmedUsername = username.trim();

    if (!trimmedUsername || !password) {
      setError('Please provide both username/email and password.');
      return;
    }

    setIsLoading(true);

    // Simulate authentication delay for smooth UX
    setTimeout(() => {
      // Validate static credentials (user1 / 1234)
      if (trimmedUsername.toLowerCase() === 'user1' && password === '1234') {
        onLogin({ username: 'user1', role: 'Security Analyst' });
        navigate(from, { replace: true });
      } else {
        setError('Invalid credentials. Please use username: "user1" and password: "1234"');
        setIsLoading(false);
      }
    }, 400);
  };

  const handleFillDemo = () => {
    setUsername('user1');
    setPassword('1234');
    setError('');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="rounded-2xl glass-panel-glow p-8 border border-slate-800 relative shadow-2xl">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500 to-cyan-400 text-slate-950 font-bold mb-4 shadow-lg shadow-teal-500/30">
              <Lock className="w-7 h-7 stroke-[2.2]" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Security Portal Login</h2>
            <p className="text-slate-400 text-xs mt-1.5">
              Access the Surveillance Video Violence Detection Studio
            </p>
          </div>

          {/* Quick Demo Helper Alert */}
          <div className="mb-6 p-3.5 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-start justify-between gap-3">
            <div className="text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-teal-300">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>Static Demo Credentials</span>
              </div>
              <p className="text-slate-300 mt-1 font-mono text-[11px]">
                Username: <strong className="text-white">user1</strong> • Password: <strong className="text-white">1234</strong>
              </p>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[11px] font-bold text-teal-300 bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/40 px-2.5 py-1 rounded-lg transition-colors shrink-0"
            >
              Autofill
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-start gap-2.5 text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Username or Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. user1"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="e.g. 1234"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 rounded-xl font-bold bg-gradient-to-r from-teal-400 via-teal-300 to-cyan-400 text-slate-950 hover:brightness-110 shadow-lg shadow-teal-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In to Detection Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Bottom Back link */}
          <div className="mt-6 pt-5 border-t border-slate-800 text-center">
            <Link to="/" className="text-xs text-slate-400 hover:text-teal-400 transition-colors">
              &larr; Back to System Overview
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
