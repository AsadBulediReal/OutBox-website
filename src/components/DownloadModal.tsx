import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  Monitor,
  Apple,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  Lock
} from 'lucide-react';
import { ModalSponsorAd } from './ads/ModalSponsorAd';
import { useReleaseInfo } from '../context/ReleaseContext';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOs?: 'win' | 'mac';
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  initialOs
}) => {
  const release = useReleaseInfo();
  const [selectedOs, setSelectedOs] = useState<'win' | 'mac'>('win');
  const [detectedOs, setDetectedOs] = useState<'win' | 'mac'>('win');
  const [hasDownloaded, setHasDownloaded] = useState<boolean>(false);
  const [downloadedOs, setDownloadedOs] = useState<'win' | 'mac'>('win');

  // Detect platform on mount / open
  useEffect(() => {
    if (isOpen) {
      setHasDownloaded(false);
      let detected: 'win' | 'mac' = 'win';
      if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
        const ua = (navigator.userAgent || navigator.platform || '').toLowerCase();
        if (ua.includes('mac') || ua.includes('darwin')) {
          detected = 'mac';
        }
      }
      setDetectedOs(detected);
      setSelectedOs(initialOs || detected);
    }
  }, [isOpen, initialOs]);

  // Handle ESC key and scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownload = (os: 'win' | 'mac') => {
    const downloadUrl = os === 'win' ? release.winDownloadUrl : release.macDownloadUrl;
    const fileName = os === 'win' ? release.winFileName : release.macFileName;

    setDownloadedOs(os);
    setHasDownloaded(true);

    // Trigger download
    try {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      window.location.href = downloadUrl;
    }
  };

  const activeFileName = selectedOs === 'win' ? release.winFileName : release.macFileName;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-xl rounded-3xl bg-white dark:bg-[#0c1222] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl shadow-blue-950/20 text-slate-900 dark:text-white transition-all transform animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 transition cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!hasDownloaded ? (
          /* ================= VIEW 1: PLATFORM SELECTION & DOWNLOAD ================= */
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start gap-4 select-none pr-8">
              <div className="relative shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-sky-500 to-indigo-600 p-0.5 shadow-xl shadow-blue-600/30">
                  <div className="w-full h-full rounded-[14px] bg-blue-600 flex items-center justify-center p-2.5">
                    <img
                      src="/outbox_icon.svg"
                      alt="Outbox Downloader"
                      className="w-full h-full object-contain filter drop-shadow select-none pointer-events-none"
                      draggable={false}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Get Outbox Downloader
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    v{release.version}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Fast, selective Dropbox downloads. Standalone desktop app.
                </p>
              </div>
            </div>

            {/* Operating System Tabs */}
            <div className="flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedOs('win')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 cursor-pointer ${selectedOs === 'win'
                    ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/80 dark:border-slate-700/80 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
              >
                <Monitor className="w-4 h-4" />
                <span>Windows (.exe)</span>
                {detectedOs === 'win' && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium hidden sm:inline-block">
                    Your OS
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setSelectedOs('mac')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 cursor-pointer ${selectedOs === 'mac'
                    ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/80 dark:border-slate-700/80 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
              >
                <Apple className="w-4 h-4" />
                <span>macOS (.dmg)</span>
                {detectedOs === 'mac' && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium hidden sm:inline-block">
                    Your OS
                  </span>
                )}
              </button>
            </div>

            {/* Active Platform Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/60 via-indigo-50/30 to-transparent dark:from-blue-950/20 dark:via-slate-900/60 dark:to-slate-900/40 border border-blue-200/80 dark:border-blue-900/40 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {selectedOs === 'win' ? 'Outbox for Windows' : 'Outbox for macOS'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                    {activeFileName}
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60">
                  {selectedOs === 'win' ? release.winSizeFormatted : release.macSizeFormatted}
                </span>
              </div>

              {/* System Specs Chips */}
              <div className="flex flex-wrap gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                {selectedOs === 'win' ? (
                  <>
                    <span className="px-2 py-0.5 rounded-md bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
                      Windows 10 / 11 (64-bit)
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
                      Standalone .exe
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
                      No runtime required
                    </span>
                  </>
                ) : (
                  <>
                    <span className="px-2 py-0.5 rounded-md bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
                      macOS 12+ (Monterey, Ventura, Sonoma, Sequoia)
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
                      Apple Silicon & Intel Universal
                    </span>
                  </>
                )}
              </div>

              {/* Big Download Button */}
              <button
                type="button"
                onClick={() => handleDownload(selectedOs)}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
              >
                <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                <span>
                  Download {selectedOs === 'win' ? 'for Windows (.exe)' : 'for macOS (.dmg)'}
                </span>
              </button>
            </div>

            {/* Optional Sponsor Ad (hides completely if no ad is active) */}
            <ModalSponsorAd />

            {/* Trust & Security Verification Bar */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                  <ShieldCheck className="w-4 h-4" /> 100% Virus-Free
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" /> Zero Telemetry
                </span>
              </div>

              <a
                href={release.releaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                <span>Release notes & SHA-256</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ) : (
          /* ================= VIEW 2: DOWNLOAD STARTED CELEBRATION & NEXT STEPS ================= */
          <div className="space-y-6 animate-fade-in">
            {/* Celebration Header */}
            <div className="text-center space-y-2 pt-2">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Your download has started!
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
                  {downloadedOs === 'win' ? release.winFileName : release.macFileName}
                </span>{' '}
                is downloading to your computer.
              </p>
            </div>

            {/* If download didn't start retry box */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-600 dark:text-slate-400">
              Download didn't start automatically?{' '}
              <button
                type="button"
                onClick={() => handleDownload(downloadedOs)}
                className="font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 cursor-pointer ml-1"
              >
                <RefreshCw className="w-3 h-3" /> Click here to retry
              </button>
            </div>

            {/* 3-Step Setup Walkthrough */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Next Steps to get running:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
                  <div className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono font-bold text-xs flex items-center justify-center mb-2">
                    1
                  </div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">Open Installer</h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                    {downloadedOs === 'win'
                      ? 'Launch the downloaded .exe installer from your browser.'
                      : 'Double click the downloaded .dmg image in Downloads.'}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
                  <div className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono font-bold text-xs flex items-center justify-center mb-2">
                    2
                  </div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                    {downloadedOs === 'win' ? 'Run Setup' : 'Move to Apps'}
                  </h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                    {downloadedOs === 'win'
                      ? 'Follow the wizard. It sets up shortcuts automatically.'
                      : 'Drag Outbox Downloader into your Applications folder.'}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-xs flex items-center justify-center mb-2">
                    3
                  </div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">Paste & Download</h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                    Launch Outbox, paste any Dropbox link, and cherry-pick what you need!
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80">
              <button
                type="button"
                onClick={() => setHasDownloaded(false)}
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition font-medium cursor-pointer"
              >
                ← Download another platform
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-bold text-xs shadow-md transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
