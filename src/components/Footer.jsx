import React from 'react';
import { ShieldCheck, Cpu, Database, Eye } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950/80 py-10 mt-20 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-slate-200">AegisVision AI</p>
              <p className="text-[11px] text-slate-500">AI-Powered Surveillance Video Analytics</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <span className="flex items-center gap-1.5 hover:text-slate-200 transition-colors">
              <Cpu className="w-3.5 h-3.5 text-teal-400" /> Real-Time Frame Analysis
            </span>
            <span className="flex items-center gap-1.5 hover:text-slate-200 transition-colors">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" /> Automated Safety Alerting
            </span>
            <span className="flex items-center gap-1.5 hover:text-slate-200 transition-colors">
              <Database className="w-3.5 h-3.5 text-teal-400" /> Surveillance Video Inspection
            </span>
          </div>

          <p className="text-slate-500 text-center sm:text-right">
            &copy; {new Date().getFullYear()} AegisVision AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
