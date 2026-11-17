import React from 'react';
import { 
  Download, 
  Sparkles, 
  ShieldCheck, 
  RotateCcw, 
  FolderTree, 
  KeyRound, 
  ArrowRight
} from 'lucide-react';

interface HeroProps {
  onOpenDownload: () => void;
  onScrollToSimulator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDownload, onScrollToSimulator }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
      {/* Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Announcement Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-medium text-slate-300 shadow-inner mb-6 hover:border-blue-500/50 transition">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="font-semibold text-blue-400">Outbox v2.4 Release</span>
            <span className="text-slate-500">•</span>
            <span>PySide6 + Resumable HTTP Range Engine</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.12]">
            Selective Downloads for{' '}
            <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-300 bg-clip-text text-transparent">
              Massive Dropbox Links.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Stop downloading 100+ GB <code className="text-blue-300 bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-800/50 text-sm font-mono">.zip</code> archives that fail at 99%. Outbox browses remote Dropbox shared folder hierarchies, lets you cherry-pick only what you want, and downloads with SHA-256 verified integrity and byte-level resume.
          </p>

          {/* Key Value Propositions Row */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-medium text-slate-300">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <FolderTree className="w-4 h-4 text-blue-400" />
              <span>No 20 GB / 10k File Zip Cap</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <RotateCcw className="w-4 h-4 text-sky-400" />
              <span>Byte-Range Resumable Streams</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>SHA-256 Auto-Healing</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <KeyRound className="w-4 h-4 text-amber-400" />
              <span>Zero-Secret PKCE OAuth</span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={onOpenDownload}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Download className="w-5 h-5" />
              <span>Download for Windows (.exe)</span>
            </button>

            <button
              onClick={onScrollToSimulator}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-2xl text-base font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 hover:text-white border border-slate-700/80 shadow-lg transition-all cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-blue-400" />
              <span>Try Interactive App Demo</span>
            </button>
          </div>

          {/* Small Trust Line */}
          <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
            <span>Free & Open-Source (MIT)</span>
            <span>•</span>
            <span>No Dropbox Storage Quota Consumed</span>
            <span>•</span>
            <span>Windows 10 / 11 Native</span>
          </div>

          {/* Stats Bar */}
          <div className="mt-14 w-full grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md shadow-2xl">
            <div className="flex flex-col items-center justify-center p-3 text-center">
              <div className="flex items-center gap-1.5 text-blue-400 font-extrabold text-2xl sm:text-3xl font-mono">
                0 <span className="text-base font-sans font-semibold text-slate-400">GB</span>
              </div>
              <span className="text-xs text-slate-400 mt-1">Wasted Disk Bandwidth</span>
            </div>

            <div className="flex flex-col items-center justify-center p-3 text-center border-l border-slate-800">
              <div className="flex items-center gap-1.5 text-emerald-400 font-extrabold text-2xl sm:text-3xl font-mono">
                100<span className="text-base font-sans font-semibold text-slate-400">%</span>
              </div>
              <span className="text-xs text-slate-400 mt-1">SHA-256 Hash Verified</span>
            </div>

            <div className="flex flex-col items-center justify-center p-3 text-center border-l border-slate-800">
              <div className="flex items-center gap-1.5 text-sky-400 font-extrabold text-2xl sm:text-3xl font-mono">
                3 <span className="text-base font-sans font-semibold text-slate-400">Steps</span>
              </div>
              <span className="text-xs text-slate-400 mt-1">Guided Link Workflow</span>
            </div>

            <div className="flex flex-col items-center justify-center p-3 text-center border-l border-slate-800">
              <div className="flex items-center gap-1.5 text-amber-400 font-extrabold text-2xl sm:text-3xl font-mono">
                0 <span className="text-base font-sans font-semibold text-slate-400">Cap</span>
              </div>
              <span className="text-xs text-slate-400 mt-1">Bypasses Server Zip Limits</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
