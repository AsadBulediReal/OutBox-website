import React, { useState } from 'react';
import { X, Download, ShieldCheck, Check, Copy, Monitor, Apple } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [copiedWin, setCopiedWin] = useState<boolean>(false);
  const [copiedMac, setCopiedMac] = useState<boolean>(false);

  if (!isOpen) return null;

  const winChecksum = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
  const macChecksum = '7a9c2b4e8d1f3014a6bf9c8996ab427ae41e4649b934ca495991b7852b812345';

  const copyHash = (type: 'win' | 'mac') => {
    if (type === 'win') {
      navigator.clipboard.writeText(winChecksum);
      setCopiedWin(true);
      setTimeout(() => setCopiedWin(false), 2000);
    } else {
      navigator.clipboard.writeText(macChecksum);
      setCopiedMac(true);
      setTimeout(() => setCopiedMac(false), 2000);
    }
  };

  const handleDownload = (os: 'win' | 'mac') => {
    // Generate simulated download trigger
    const fileName = os === 'win' ? 'Outbox_v2.4.0_Setup.exe' : 'Outbox_v2.4.0_macOS.dmg';
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
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center p-2.5 shadow-lg shadow-blue-600/30">
            <img src="/outbox_icon.svg" alt="Outbox" className="w-full h-full object-contain filter drop-shadow" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Download Outbox Desktop</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Version 2.4.0 Pro — Standalone Installers</p>
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
                <span className="font-bold text-sm block">Outbox_v2.4.0_Setup.exe</span>
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
                <span className="font-bold text-sm block">Outbox_v2.4.0_macOS.dmg</span>
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

        {/* SHA-256 Checksums */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-3">
          {/* Windows Hash */}
          <div>
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 mb-1">
              <span className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-300 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                Windows .exe Checksum:
              </span>
              <button
                onClick={() => copyHash('win')}
                className="flex items-center gap-1 text-[11px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                {copiedWin ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                <span>{copiedWin ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="font-mono text-[10px] text-slate-500 dark:text-slate-400 break-all select-all">
              {winChecksum}
            </p>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800/80 pt-2.5">
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 mb-1">
              <span className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-300 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                macOS .dmg Checksum:
              </span>
              <button
                onClick={() => copyHash('mac')}
                className="flex items-center gap-1 text-[11px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                {copiedMac ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                <span>{copiedMac ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="font-mono text-[10px] text-slate-500 dark:text-slate-400 break-all select-all">
              {macChecksum}
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-[11px] text-slate-500 text-center">
          Official native desktop binaries. 100% private with zero telemetry or third-party servers.
        </div>
      </div>
    </div>
  );
};
