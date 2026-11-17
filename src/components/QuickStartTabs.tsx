import React, { useState } from 'react';
import { Download, Monitor, Apple } from 'lucide-react';

export const QuickStartTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'win' | 'mac'>('win');

  return (
    <section id="quickstart" className="py-20 md:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Installation & Setup
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Get Started in Under 2 Minutes.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Download the native standalone binary for your operating system. Zero runtime dependencies or setup hurdles.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md dark:shadow-xl overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('win')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'win'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>Windows (.exe)</span>
            </button>

            <button
              onClick={() => setActiveTab('mac')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'mac'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Apple className="w-4 h-4" />
              <span>macOS (.dmg)</span>
            </button>
          </div>
        </div>

        {/* Tab Content Panes */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'win' && (
            <div className="rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl dark:shadow-2xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Windows Standalone Executable</h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Windows 10 and 11 (64-bit). No dependencies or runtimes needed.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-mono font-semibold">
                  v2.4 Ready
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div className="text-xs text-slate-400 dark:text-slate-500 font-mono font-bold">STEP 1</div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">Download Installer</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Directly obtain the signed <code className="text-blue-600 dark:text-blue-400">Outbox_v2.4.0_Setup.exe</code> package.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div className="text-xs text-slate-400 dark:text-slate-500 font-mono font-bold">STEP 2</div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">Launch Outbox</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Run the installer. Outbox launches with a native, responsive desktop GUI.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div className="text-xs text-slate-400 dark:text-slate-500 font-mono font-bold">STEP 3</div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">Browser Sign-In</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Click "Connect Dropbox" to sign in securely through your browser.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  Outbox v2.4.0 · Windows 10/11 (64-bit) · ~42 MB
                </div>
                <button
                  onClick={() => alert('Starting Windows Installer download (Outbox_v2.4.0_Setup.exe)...')}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/30 transition whitespace-nowrap cursor-pointer flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Windows (.exe)</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'mac' && (
            <div className="rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl dark:shadow-2xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">macOS Universal Disk Image (.dmg)</h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Universal binary for Apple Silicon (M1/M2/M3/M4) and Intel Macs.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-mono font-semibold">
                  macOS 12+
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div className="text-xs text-slate-400 dark:text-slate-500 font-mono font-bold">STEP 1</div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">Download .dmg</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Download the verified <code className="text-blue-600 dark:text-blue-400">Outbox_v2.4.0_macOS.dmg</code> image (~48 MB).</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div className="text-xs text-slate-400 dark:text-slate-500 font-mono font-bold">STEP 2</div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">Drag to Applications</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Open the disk image and drag the Outbox icon into your Applications folder.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div className="text-xs text-slate-400 dark:text-slate-500 font-mono font-bold">STEP 3</div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">Ready to Stream</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Launch Outbox from Spotlight or Launchpad and paste your first Dropbox link.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  Outbox v2.4.0 · Apple Silicon & Intel · ~48 MB
                </div>
                <button
                  onClick={() => alert('Starting macOS Disk Image download (Outbox_v2.4.0_macOS.dmg)...')}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/30 transition whitespace-nowrap cursor-pointer flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Mac (.dmg)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
