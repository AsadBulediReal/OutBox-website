import React, { useState } from 'react';
import { 
  Layers, 
  Cpu, 
  Copy, 
  Check, 
  FileCode, 
  ShieldCheck 
} from 'lucide-react';

export const ArchitectureSection: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const fileTreeStructure = `src/
├── main_window/           # MainWindow assembly & focused mixins
│   ├── __init__.py        # Window init, public exports & event loop
│   ├── oauth.py           # PKCE OAuth browser authentication flow
│   ├── scan_tree.py       # Folder scanning & directory tree population
│   ├── queue.py           # Live transfer queue & remaining preview
│   ├── transfer_start.py  # Download & verification worker orchestration
│   ├── transfer_status.py # Live telemetry, speed & activity logging
│   └── tree_selection.py  # Checkbox state propagation & size counters
├── workers/               # Multithreaded QThread background workers
│   ├── download.py        # DownloadWorker lifecycle management
│   ├── transfer_mixin.py  # HTTP Range resume & chunk-flushed streaming
│   ├── verify_mixin.py    # SHA-256 block hash verification & auto-repair
│   └── auth_scan.py       # AuthWorker, SessionVerifyWorker & ScanWorker
├── dialogs/               # Custom modern Qt modal components
│   ├── loading_tree.py    # ModernLoadingDialog & FileTreeWidget
│   └── __init__.py        # ModernMessageBox & ModernInputDialog
├── styles/                # Clean Light & Minimal Dark QSS theme compiler
└── utils/                 # Pathing, formatting & Dropbox content_hash helpers`;

  const copyTree = () => {
    navigator.clipboard.writeText(fileTreeStructure);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="architecture" className="py-20 md:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Codebase Quality & Design
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Built with Clean, Modular Architecture.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Strictly engineered following professional design patterns: focused mixin architecture, non-blocking multithreaded workers, and zero oversized files.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-md dark:shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">≤ 400 Lines per File</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Every Python file adheres to a strict maximum length rule. Single-responsibility mixins isolate link handling, tree scanning, OAuth flows, and transfer telemetry.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-md dark:shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Non-Blocking Background Workers</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Network streaming and file verification run in dedicated background threads. The interface never freezes, even on heavy multi-gigabyte transfers.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-md dark:shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Automated Test Suite</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Full automated test coverage with pytest. Validates resume logic, integrity hash calculations, destination matching, and path sanitization.
            </p>
          </div>
        </div>

        {/* Directory Explorer Card */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-blue-400" />
              <span className="text-xs sm:text-sm font-semibold text-slate-200">
                Outbox Python Source Code Layout
              </span>
            </div>
            <button
              onClick={copyTree}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Tree'}</span>
            </button>
          </div>

          <div className="p-6 overflow-x-auto">
            <pre className="text-xs sm:text-sm font-mono text-slate-300 leading-relaxed">
              {fileTreeStructure}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};
