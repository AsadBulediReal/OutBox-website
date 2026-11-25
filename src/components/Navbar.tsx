import React, { useState } from 'react';
import {
  Download,
  Sparkles,
  Sun,
  Moon,
  Menu,
  X,
  Mail
} from 'lucide-react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDemoClick = () => {
    setMobileMenuOpen(false);
    onScrollToSimulator();
  };

  const navLinks = [
    { label: 'Interactive Demo', isDemo: true },
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#comparison', label: 'Comparison' },
    { href: '#about', label: 'About Us' },
    { href: '#quickstart', label: 'Setup' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contact', label: 'Contact Us' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/85 dark:bg-[#060913]/85 border-b border-slate-200 dark:border-slate-800/80 transition-colors shadow-xs dark:shadow-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 shrink-0 text-left cursor-pointer select-none caret-transparent outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl group transition-transform active:scale-98"
          aria-label="Outbox Downloader - Home"
        >
          <div className="relative select-none pointer-events-none">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-sm opacity-60 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg bg-blue-600 flex items-center justify-center p-1.5 border border-white/20 select-none">
              <img
                src="/outbox_icon.svg"
                alt="Outbox Icon"
                className="w-full h-full object-contain filter drop-shadow select-none pointer-events-none"
                draggable={false}
              />
            </div>
          </div>
          <div className="flex flex-col select-none pointer-events-none">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white leading-tight">
              Outbox
            </span>
            <span className="text-blue-600 dark:text-blue-400 font-bold text-xs tracking-normal leading-tight">
              Downloader
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links (Ordered to match page flow) */}
        <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 2xl:gap-6 text-xs xl:text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={onScrollToSimulator}
            className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
            Interactive Demo
          </button>
          <a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap">Features</a>
          <a href="#how-it-works" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap">How It Works</a>
          <a href="#comparison" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap">Comparison</a>
          <a href="#quickstart" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap">Setup</a>
          <a href="#about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap">About Us</a>
          <a href="#faq" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap">FAQ</a>
          <a
            href="#contact"
            className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors whitespace-nowrap px-2.5 py-1 rounded-lg bg-blue-50/80 dark:bg-blue-950/40 hover:bg-blue-100/80 dark:hover:bg-blue-900/50 border border-blue-500/20"
          >
            <Mail className="w-3.5 h-3.5 text-blue-500" />
            <span>Contact Us</span>
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Theme Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition cursor-pointer"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Download CTA */}
          <button
            onClick={onOpenDownload}
            className="relative group inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-500/25 transition-all transform active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            <span>Download Outbox</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800/80 bg-white/95 dark:bg-[#060913]/95 backdrop-blur-xl px-4 py-4 space-y-2">
          {navLinks.map((item, idx) => (
            item.isDemo ? (
              <button
                key={idx}
                onClick={handleDemoClick}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition text-left"
              >
                <Sparkles className="w-4 h-4" />
                {item.label}
              </button>
            ) : (
              <a
                key={idx}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition ${item.href === '#contact'
                  ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold border border-blue-500/20'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
              >
                {item.href === '#contact' && <Mail className="w-4 h-4 text-blue-500" />}
                {item.label}
              </a>
            )
          ))}
        </div>
      )}
    </header>
  );
};
