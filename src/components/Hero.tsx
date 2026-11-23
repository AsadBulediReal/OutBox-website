import React from 'react';
import {
  Download,
  Sparkles,
  Apple
} from 'lucide-react';

interface HeroProps {
  onOpenDownload: (os?: 'win' | 'mac') => void;
  onScrollToSimulator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDownload, onScrollToSimulator }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
      {/* Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-1/3 right-10 w-[380px] h-[380px] bg-indigo-500/10 dark:bg-indigo-600/12 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Main Title with Background Gradient Aura */}
          <div className="relative w-full">
            {/* Luminous Title Background Gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] sm:w-[140%] h-[180px] sm:h-[260px] bg-gradient-to-r from-blue-500/25 via-sky-400/30 to-indigo-500/25 dark:from-blue-600/35 dark:via-sky-500/25 dark:to-indigo-600/35 blur-3xl rounded-full pointer-events-none -z-10" />

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.12]">
              <span className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                Selective Downloads for{' '}
              </span>
              <span className="bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 dark:from-blue-400 dark:via-sky-300 dark:to-indigo-300 bg-clip-text text-transparent">
                Massive Dropbox Links.
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            Stop downloading 100+ GB <code className="text-blue-700 bg-blue-100/70 border border-blue-200 dark:text-blue-300 dark:bg-blue-950/80 dark:border-blue-800/60 px-2 py-0.5 rounded text-sm font-mono">.zip</code> archives that fail halfway. Outbox Downloader lets you browse shared folders, pick only the files you need, and download them reliably with automatic resume and file verification.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => onOpenDownload('win')}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-7 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-xl shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Download className="w-5 h-5" />
              <span>Download for Windows (.exe)</span>
            </button>

            <button
              onClick={() => onOpenDownload('mac')}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl text-base font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900/90 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-md hover:border-blue-400 transition-all cursor-pointer"
            >
              <Apple className="w-5 h-5 text-slate-800 dark:text-slate-200" />
              <span>Download for Mac (.dmg)</span>
            </button>

            <button
              onClick={onScrollToSimulator}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-4 rounded-2xl text-sm font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-transparent hover:border-blue-200 dark:hover:border-blue-800/50 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Try Simulator</span>
            </button>
          </div>

          {/* Small Trust Line */}
          <div className="mt-4 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span>Free & Clean</span>
            <span>•</span>
            <span>Windows 10/11 & macOS Native</span>
            <span>•</span>
            <span>No Dropbox Storage Quota Consumed</span>
          </div>

          {/* Stats Bar */}
          <div className="mt-14 w-full grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/90 shadow-xl dark:shadow-black/50 transition-colors">
            <div className="flex flex-col items-center justify-center p-3 text-center">
              <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-extrabold text-2xl sm:text-3xl font-mono">
                0 <span className="text-base font-sans font-semibold text-slate-400">GB</span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">Wasted Disk Bandwidth</span>
            </div>

            <div className="flex flex-col items-center justify-center p-3 text-center border-l border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-extrabold text-2xl sm:text-3xl font-mono">
                100<span className="text-base font-sans font-semibold text-slate-400">%</span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">Verified File Integrity</span>
            </div>

            <div className="flex flex-col items-center justify-center p-3 text-center md:border-l border-t md:border-t-0 border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400 font-extrabold text-2xl sm:text-3xl font-mono">
                3 <span className="text-base font-sans font-semibold text-slate-400">Steps</span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">Guided Link Workflow</span>
            </div>

            <div className="flex flex-col items-center justify-center p-3 text-center border-l md:border-l border-t md:border-t-0 border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-extrabold text-2xl sm:text-3xl font-mono">
                0 <span className="text-base font-sans font-semibold text-slate-400">Cap</span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">Bypasses Server Zip Limits</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
