import React from 'react';
import { 
  Download, 
  Moon, 
  Sun, 
  Sparkles
} from 'lucide-react';
import { GithubIcon } from './GithubIcon';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenDownload: () => void;
  onScrollToSimulator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  onOpenDownload,
  onScrollToSimulator,
}) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-sm opacity-60 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg bg-blue-600 flex items-center justify-center p-1.5 border border-white/20">
              <img src="/outbox_icon.svg" alt="Outbox Icon" className="w-full h-full object-contain filter drop-shadow" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white">Outbox</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                v2.4 Pro
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Dropbox Recursive Downloader</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
          <button 
            onClick={onScrollToSimulator}
            className="flex items-center gap-1.5 hover:text-blue-400 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Interactive Demo
          </button>
          <a href="#comparison" className="hover:text-blue-400 transition-colors">Comparison</a>
          <a href="#how-it-works" className="hover:text-blue-400 transition-colors">How It Works</a>
          <a href="#architecture" className="hover:text-blue-400 transition-colors">Tech Architecture</a>
          <a href="#quickstart" className="hover:text-blue-400 transition-colors">Setup</a>
          <a href="#faq" className="hover:text-blue-400 transition-colors">FAQ</a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/dropbox-downloader/outbox"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition cursor-pointer"
            title="Toggle color theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-300" />}
          </button>

          <button
            onClick={onOpenDownload}
            className="relative group inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/25 transition-all transform active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Outbox</span>
          </button>
        </div>
      </div>
    </header>
  );
};
