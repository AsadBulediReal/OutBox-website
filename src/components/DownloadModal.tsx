import React from 'react';
import { X, Download, Monitor, Apple } from 'lucide-react';
import { ModalSponsorAd } from './ads/ModalSponsorAd';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleDownload = (os: 'win' | 'mac') => {
    // Generate simulated download trigger
    const fileName = os === 'win' ? 'Outbox_Downloader_v2.4.0_Setup.exe' : 'Outbox_Downloader_v2.4.0_macOS.dmg';
    alert(`Starting download for ${fileName}...\n\nOperating System: ${os === 'win' ? 'Windows 10/11 (64-bit)' : 'macOS (Apple Silicon & Intel)'}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6 transition-colors">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 select-none">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center p-2.5 shadow-lg shadow-blue-600/30 select-none">
            <img src="/outbox_icon.svg" alt="Outbox Downloader" className="w-full h-full object-contain filter drop-shadow select-none pointer-events-none" draggable={false} />
          </div>
          <div className="select-none">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white select-none">Download Outbox Downloader</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 select-none">Version 2.4.0 Pro — Standalone Installers (outboxdownloader.com)</p>
          </div>
        </div>

        {/* Download Options (Windows and Mac Only) */}
        <div className="space-y-3">
          {/* Option 1: Windows (.exe) */}
          <button
            onClick={() => handleDownload('win')}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25 transition group cursor-pointer text-left"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white">
                <Monitor className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-sm block">Outbox_Downloader_v2.4.0_Setup.exe</span>
                <span className="text-xs text-blue-100">Windows 10 & 11 (64-bit installer) (~42 MB)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-white/20">
                .EXE
              </span>
              <Download className="w-4 h-4 group-hover:translate-y-0.5 transition" />
            </div>
          </button>

          {/* Option 2: macOS (.dmg) */}
          <button
            onClick={() => handleDownload('mac')}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/90 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white transition group cursor-pointer text-left"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-800 dark:text-white">
                <Apple className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-sm block">Outbox_Downloader_v2.4.0_macOS.dmg</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">macOS Universal: Apple Silicon (M1-M4) & Intel (~48 MB)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                .DMG
              </span>
              <Download className="w-4 h-4 group-hover:translate-y-0.5 transition" />
            </div>
          </button>
        </div>

        {/* Sponsor Companion Ad */}
        <ModalSponsorAd />

        {/* Footer info */}
        <div className="text-[11px] text-slate-500 text-center">
          Official native desktop binaries. 100% private with zero telemetry or third-party servers.
        </div>
      </div>
    </div>
  );
};
