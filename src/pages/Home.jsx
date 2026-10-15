import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Video, 
  UploadCloud, 
  Zap, 
  Cpu, 
  FileCheck, 
  AlertTriangle, 
  ChevronRight,
  Play,
  Layers,
  Sparkles,
  UserPlus
} from 'lucide-react';

export default function Home({ isAuthenticated: propAuth }) {
  const { isAuthenticated: contextAuth } = useAuth();
  const isAuthenticated = contextAuth ?? propAuth;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Glow Circles */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-teal-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-96 right-10 w-[450px] h-[350px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Computer Vision Surveillance</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              AI-Powered <span className="bg-gradient-to-r from-teal-400 via-cyan-300 to-sky-400 bg-clip-text text-transparent">Violence Detection</span> in Video
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              An intelligent automated video analytics platform engineered to inspect CCTV camera feeds and uploaded clips. 
              It dynamically classifies human activity into <strong className="text-rose-400 font-semibold">Violent</strong> or <strong className="text-emerald-400 font-semibold">Non-Violent</strong> categories with high-accuracy confidence metrics.
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              {isAuthenticated ? (
                <Link
                  to="/detect"
                  className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-teal-400 via-teal-300 to-cyan-400 hover:brightness-110 shadow-xl shadow-teal-500/25 transition-all transform hover:-translate-y-0.5"
                >
                  <Video className="w-5 h-5 stroke-[2.5]" />
                  <span>Open Detection Studio</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-teal-400 via-teal-300 to-cyan-400 hover:brightness-110 shadow-xl shadow-teal-500/25 transition-all transform hover:-translate-y-0.5"
                  >
                    <UserPlus className="w-5 h-5 stroke-[2.5]" />
                    <span>Create Account</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to="/login"
                    className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 transition-colors"
                  >
                    <span>Sign In</span>
                  </Link>
                </>
              )}

              <a
                href="#how-it-works"
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-medium text-slate-400 hover:text-white transition-colors"
              >
                <span>How It Works</span>
              </a>
            </div>
          </div>

          {/* Hero Surveillance Card Mockup */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl glass-panel-glow p-5 overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></div>
                  <span className="text-xs font-mono font-semibold text-slate-300 tracking-wider">LIVE FEED // CAM-04</span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-teal-400 border border-teal-500/20">
                  FPS: 30.0 | RES: 1080P
                </span>
              </div>

              {/* Simulated Screen */}
              <div className="relative aspect-video rounded-xl bg-slate-900/90 border border-slate-800 overflow-hidden flex flex-col justify-between p-4">
                {/* Surveillance grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none"></div>

                <div className="relative z-10 flex justify-between items-start">
                  <div className="bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] font-mono text-slate-300 border border-white/10">
                    SECTOR 07 • CORRIDOR B
                  </div>
                  <div className="bg-rose-500/20 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] font-bold text-rose-400 border border-rose-500/40 flex items-center gap-1.5 animate-pulse">
                    <AlertTriangle className="w-3 h-3" />
                    <span>HIGH THREAT DETECTED</span>
                  </div>
                </div>

                {/* Bounding box mock in center */}
                <div className="relative z-10 mx-auto w-3/4 h-24 border-2 border-dashed border-rose-500/80 rounded-lg flex items-center justify-center bg-rose-500/5">
                  <div className="text-center">
                    <span className="px-2 py-0.5 bg-rose-600 text-white text-[10px] font-bold rounded uppercase tracking-wider">
                      Target Action: Physical Altercation
                    </span>
                    <p className="text-[11px] text-rose-300 mt-1 font-mono">Confidence: 94.8%</p>
                  </div>
                </div>

                {/* Bottom stats ticker */}
                <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-slate-400 bg-black/60 backdrop-blur-sm p-2 rounded border border-white/5">
                  <span className="text-emerald-400">Non-Violent: 5.2%</span>
                  <span className="text-rose-400 font-bold">Violent: 94.8%</span>
                </div>
              </div>

              {/* Quick Spec list */}
              <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 text-[11px]">Primary Task</span>
                  <p className="font-semibold text-slate-200 mt-0.5">Binary Video Classification</p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 text-[11px]">Inference Mode</span>
                  <p className="font-semibold text-teal-400 mt-0.5">Temporal Feature Scoring</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* System Highlights / Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-y border-slate-900">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-3xl font-extrabold text-teal-400">2-Class</div>
            <div className="text-xs text-slate-400 mt-1">Violent vs Non-Violent</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-3xl font-extrabold text-cyan-400">96.8%</div>
            <div className="text-xs text-slate-400 mt-1">Benchmark Precision</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-3xl font-extrabold text-sky-400">&lt; 150ms</div>
            <div className="text-xs text-slate-400 mt-1">Response Latency</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-3xl font-extrabold text-emerald-400">100%</div>
            <div className="text-xs text-slate-400 mt-1">Automated Frame Review</div>
          </div>
        </div>
      </section>

      {/* What it detects (Classification Schema) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            How The System Distinguishes Actions
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            Using spatial movement vectors and deep motion analytics, the model isolates hostile physical aggression from benign rapid motion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Violent Category Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-950/30 to-slate-900/80 border border-rose-500/30 shadow-lg relative overflow-hidden group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-rose-400">Violent Classification</h3>
                <p className="text-xs text-slate-400">Triggers alert & threat level calculation</p>
              </div>
            </div>

            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0"></span>
                <span><strong>Physical Combat & Brawls:</strong> Punches, kicks, aggressive body tackles, and wrestling movements.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0"></span>
                <span><strong>Weapon Brandishing & Attacks:</strong> Threatening postures involving blunt or edged objects.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0"></span>
                <span><strong>Mob Rushes & Hostile Agitation:</strong> Chaotic high-acceleration group confrontations.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0"></span>
                <span><strong>Forcible Restraint / Robbery:</strong> Non-consensual grabbing, pushing, and violent takedowns.</span>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-rose-500/20 flex items-center justify-between text-xs font-mono text-rose-300">
              <span>System Output:</span>
              <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">FLAG: VIOLENT [THREAT: HIGH]</span>
            </div>
          </div>

          {/* Non-Violent Category Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/30 to-slate-900/80 border border-emerald-500/30 shadow-lg relative overflow-hidden group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-emerald-400">Non-Violent (Normal)</h3>
                <p className="text-xs text-slate-400">Classified as normal ambient activity</p>
              </div>
            </div>

            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                <span><strong>Pedestrian & Office Movement:</strong> Normal walking, brisk walking, standing, and conversational gestures.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                <span><strong>Social & Friendly Contact:</strong> Hugging, handshakes, high-fives, and harmless physical greetings.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                <span><strong>Athletic & Sports Activity:</strong> Controlled running, jogging, jumping, exercises without assault signals.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                <span><strong>Everyday Handling of Belongings:</strong> Carrying bags, opening doors, handling workplace tools.</span>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-emerald-500/20 flex items-center justify-between text-xs font-mono text-emerald-300">
              <span>System Output:</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">FLAG: NON-VIOLENT [STATUS: SAFE]</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Workflow */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-900">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Pipeline Architecture</span>
          <h2 className="text-3xl font-bold text-white tracking-tight mt-2">
            3-Step Detection Pipeline
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            How surveillance video passes through spatial and temporal layers to produce instant metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 relative">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-4 font-bold text-lg">
              01
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Video Ingestion & Preview</h3>
            <p className="text-sm text-slate-400">
              Upload local video surveillance footage (MP4, WebM) or load benchmark test samples with instant video player inspection.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 relative">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 font-bold text-lg">
              02
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Spatiotemporal Deep Learning</h3>
            <p className="text-sm text-slate-400">
              Convolutional layers extract spatial scene features while temporal sequence analysis (LSTM / 3D-CNN) monitors motion velocity and impact spikes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 relative">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 font-bold text-lg">
              03
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Confidence & Alert Output</h3>
            <p className="text-sm text-slate-400">
              The platform renders the definitive verdict: <strong>Violent</strong> vs. <strong>Non-Violent</strong> alongside a precise confidence percentage score.
            </p>
          </div>
        </div>

        {/* Call to action card */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-slate-900 via-teal-950/40 to-slate-900 border border-teal-500/30 p-8 sm:p-10 text-center max-w-4xl mx-auto shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to test video surveillance detection?
          </h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto mt-2">
            Create an account or sign in to upload surveillance footage and run automated violence detection.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {isAuthenticated ? (
              <Link
                to="/detect"
                className="px-6 py-3 rounded-xl font-bold bg-teal-400 text-slate-950 hover:bg-teal-300 transition-colors shadow-lg shadow-teal-500/20"
              >
                Go to Detection Studio
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 hover:brightness-110 transition-all shadow-lg shadow-teal-500/20"
                >
                  Create Account
                </Link>
                <Link
                  to="/login"
                  className="px-6 py-3 rounded-xl font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 transition-colors"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
