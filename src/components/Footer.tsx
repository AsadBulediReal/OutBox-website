import React from 'react';
import { ArrowUp, Monitor, Apple } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-100/40 dark:bg-slate-950/40 backdrop-blur-md text-slate-600 dark:text-slate-400 py-16 text-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center p-1.5 shadow-md shadow-blue-600/30">
                <img src="/outbox_icon.svg" alt="Outbox" className="w-full h-full object-contain filter drop-shadow" />
              </div>
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">Outbox</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                v2.4 Pro
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              The high-performance selective downloader for massive Dropbox shared links. Built with PySide6, byte-range HTTP streaming, and cryptographic SHA-256 block verification.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <Monitor className="w-3.5 h-3.5 text-blue-500" />
                Windows 10/11 (.exe)
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <Apple className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                macOS (.dmg)
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">Product</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#simulator" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Interactive Simulator</a></li>
              <li><a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-blue-600 dark:hover:text-blue-400 transition">How It Works</a></li>
              <li><a href="#comparison" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Comparison Matrix</a></li>
              <li><a href="#architecture" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Tech Specs & Architecture</a></li>
              <li><a href="#quickstart" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Setup & Installation</a></li>
              <li><a href="#faq" className="hover:text-blue-600 dark:hover:text-blue-400 transition">FAQ</a></li>
            </ul>
          </div>

          {/* Security & Tech */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">Engineering</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                PySide6 Native GUI Engine
              </li>
              <li className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400" />
                Dropbox content_hash (SHA-256)
              </li>
              <li className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 dark:bg-sky-400" />
                HTTP Range 206 Resumable Streaming
              </li>
              <li className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400" />
                OAuth 2.0 PKCE (Zero Secrets)
              </li>
              <li className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 dark:bg-purple-400" />
                Standalone Native Binaries
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Outbox Project. All rights reserved.
          </div>
          
          <div className="text-center sm:text-right max-w-md">
            Outbox is an independent tool and is not affiliated, associated, authorized, endorsed by, or in any way officially connected with Dropbox, Inc.
          </div>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 transition cursor-pointer flex items-center gap-1"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
