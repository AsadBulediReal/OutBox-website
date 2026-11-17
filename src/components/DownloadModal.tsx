import React, { useState } from 'react';
import { X, Download, ShieldCheck, Check, Copy, ExternalLink, Terminal, HardDrive } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const checksum = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

  const copyHash = () => {
    navigator.clipboard.writeText(checksum);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center p-2.5 shadow-lg shadow-blue-600/30">
            <img src="/outbox_icon.svg" alt="Outbox" className="w-full h-full object-contain filter drop-shadow" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white">Download Outbox Desktop</h3>
            <p className="text-xs sm:text-sm text-slate-400">Version 2.4.0 — Windows 10 & 11 (64-bit)</p>
          </div>
        </div>

        {/* Download Options */}
        <div className="space-y-3">
          {/* Option 1: Standalone EXE */}
          <a
            href="https://github.com/dropbox-downloader/outbox/releases/latest"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/25 transition group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 group-hover:translate-y-0.5 transition transform" />
              <div>
                <span className="font-bold text-sm block">Outbox_v2.4.0_Setup.exe</span>
                <span className="text-xs text-blue-100">Standalone installer with desktop shortcut (~42 MB)</span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-white/20">
              Direct
            </span>
          </a>

          {/* Option 2: Portable ZIP */}
          <a
            href="https://github.com/dropbox-downloader/outbox/releases/latest"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-white transition group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <HardDrive className="w-5 h-5 text-sky-400" />
              <div>
                <span className="font-bold text-sm block">Outbox_v2.4.0_Portable.zip</span>
                <span className="text-xs text-slate-400">Zero installation. Extract and run anywhere (~46 MB)</span>
              </div>
            </div>
            <span className="text-xs font-mono text-slate-400">ZIP</span>
          </a>

          {/* Option 3: GitHub Source */}
          <a
            href="https://github.com/dropbox-downloader/outbox"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-white transition group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Terminal className="w-5 h-5 text-emerald-400" />
              <div>
                <span className="font-bold text-sm block">Python Source Code (.tar.gz / .zip)</span>
                <span className="text-xs text-slate-400">Run directly with virtual environment on Python 3.11+</span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition" />
          </a>
        </div>

        {/* SHA-256 Checksum Card */}
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="flex items-center gap-1.5 font-semibold text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              SHA-256 Release Checksum:
            </span>
            <button
              onClick={copyHash}
              className="flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <p className="font-mono text-[10px] text-slate-400 break-all select-all">
            {checksum}
          </p>
        </div>

        {/* Footer info */}
        <div className="text-[11px] text-slate-500 text-center">
          Open-Source software under MIT License. No spyware, no telemetry, no third-party servers.
        </div>
      </div>
    </div>
  );
};
