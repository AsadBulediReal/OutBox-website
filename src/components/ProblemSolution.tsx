import React from 'react';
import { XCircle, CheckCircle2 } from 'lucide-react';

export const ProblemSolution: React.FC = () => {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Why Outbox Exists
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            The Dropbox ZIP Trap vs.{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
              The Outbox Way
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Dropbox is legendary for cloud storage, but its shared link download architecture was built for small office files—not modern multi-gigabyte media and datasets.
          </p>
        </div>

        {/* Side by side comparison cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* The Pain: Dropbox Web ZIPs */}
          <div className="rounded-3xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-rose-300 dark:hover:border-rose-800/80 transition duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/10 dark:bg-rose-500/20 border border-rose-300 dark:border-rose-500/30 flex items-center justify-center text-rose-500 dark:text-rose-400">
                    <XCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Default Dropbox Web ZIP</h3>
                    <p className="text-xs text-rose-600 dark:text-rose-300">Monolithic, brittle server compression</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-rose-500/10 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-500/30 text-xs font-bold font-mono">
                  THE STRUGGLE
                </span>
              </div>

              <ul className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-500 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block font-medium">Arbitrary 20 GB / 10,000 File ZIP Cap</strong>
                    Dropbox servers refuse to generate archive bundles if the shared folder exceeds 20 GB or contains over 10,000 items.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-500 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block font-medium">Zero Resumability on Network Drops</strong>
                    If your Wi-Fi flickers at 98% of a 15 GB zip file, your browser discards the temporary file and forces you to restart from 0%.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-500 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block font-medium">Massive Wasted Disk Space & Bandwidth</strong>
                    Forced to download an entire 80 GB project directory just to retrieve two 200 MB footage takes or an updated PDF brief.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-500 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block font-medium">Silent Archive Corruption</strong>
                    Browsers don't verify file integrity. If the connection glitches or zips corrupt, files silently break or fail to extract.
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-rose-100/60 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-800 dark:text-rose-300 font-mono">
              💥 Result: Hours of wasted download time, failed client deadlines, and uncompressed storage bottlenecks.
            </div>
          </div>

          {/* The Solution: Outbox */}
          <div className="rounded-3xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/60 p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-blue-300 dark:hover:border-blue-700 transition duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 border border-blue-300 dark:border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Outbox Desktop Engine</h3>
                    <p className="text-xs text-blue-600 dark:text-blue-300">Selective, reliable, and verified downloads</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-500/30 text-xs font-bold font-mono">
                  THE SOLUTION
                </span>
              </div>

              <ul className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block font-medium">Cherry-Pick Exactly What You Need</strong>
                    Explore the full remote hierarchy in a responsive visual tree. Select individual files or entire folders without downloading everything.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block font-medium">Resume Interrupted Downloads</strong>
                    Never lose progress when Wi-Fi flickers or your computer sleeps. Outbox safely resumes transfers from where they paused.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block font-medium">Automatic File Self-Healing</strong>
                    Checks every file against cloud checksums in real time. Any broken or incomplete file is detected and repaired automatically.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block font-medium">Smart Destination Directory Matching</strong>
                    Prevents annoying double-nesting (e.g. <code className="text-blue-700 dark:text-blue-300 font-mono text-xs">Photos/Photos/</code>). Files land cleanly in your selected directory.
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-blue-100/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/80 text-xs text-blue-800 dark:text-blue-300 font-mono">
              ✨ Result: 100% reliable downloads, 80%+ bandwidth saved, zero wasted quota, and complete peace of mind.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
