import React from 'react';
import { Check, X } from 'lucide-react';
import { COMPARISONS } from '../data/mockData';

export const ComparisonTable: React.FC = () => {
  const renderCell = (val: boolean | string) => {
    if (typeof val === 'boolean') {
      return val ? (
        <div className="flex items-center justify-center" title="Fully Supported">
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shadow-xs">
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center" title="Not Supported">
          <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30 shadow-xs">
            <X className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
        </div>
      );
    }

    const cleanText = typeof val === 'string' ? val.replace(/^\(|\)$/g, '') : '';

    return (
      <div className="flex items-center justify-center">
        <div 
          className="relative inline-flex items-center justify-center group/tip cursor-help"
          title={cleanText}
        >
          <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-500 dark:text-rose-400 flex items-center justify-center border border-rose-500/30 shadow-xs transition-transform duration-150 group-hover/tip:scale-110">
            <X className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>

          {/* Floating Hover Tooltip */}
          <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tip:flex flex-col items-center z-30 transition-all duration-150">
            <div className="px-2.5 py-1 text-[11px] font-semibold text-white bg-slate-900/95 dark:bg-slate-800/95 border border-slate-700/80 rounded-lg shadow-xl whitespace-nowrap backdrop-blur-sm">
              {cleanText}
            </div>
            {/* Tooltip caret */}
            <div className="w-2 h-2 -mt-1 rotate-45 bg-slate-900/95 dark:bg-slate-800/95 border-r border-b border-slate-700/80" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="comparison" className="py-20 md:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Head-to-Head Comparison
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How Outbox Downloader Compares
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            See how Outbox Downloader matches up against traditional web downloads, the official desktop client, and complex CLI utilities.
          </p>
        </div>

        {/* Comparison Table Card */}
        <div className="rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl overflow-hidden backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70">
                  <th className="py-5 px-6 text-sm font-bold text-slate-800 dark:text-slate-300 w-1/3">
                    Capability / Feature
                  </th>
                  <th className="py-5 px-6 text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-600/10 border-x border-blue-200 dark:border-blue-500/20 text-center w-1/6">
                    <div className="flex flex-col items-center">
                      <span className="text-base font-extrabold text-blue-600 dark:text-white">Outbox Downloader</span>
                      <span className="text-[10px] text-blue-600 dark:text-blue-300 uppercase tracking-widest font-mono">Recommended</span>
                    </div>
                  </th>
                  <th className="py-5 px-6 text-sm font-bold text-slate-700 dark:text-slate-300 text-center w-1/6">
                    <div className="flex flex-col items-center">
                      <span>Dropbox Web</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">Default ZIP</span>
                    </div>
                  </th>
                  <th className="py-5 px-6 text-sm font-bold text-slate-700 dark:text-slate-300 text-center w-1/6">
                    <div className="flex flex-col items-center">
                      <span>Official Client</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">Sync App</span>
                    </div>
                  </th>
                  <th className="py-5 px-6 text-sm font-bold text-slate-700 dark:text-slate-300 text-center w-1/6">
                    <div className="flex flex-col items-center">
                      <span>rclone / CLI</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">Terminal Script</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80 text-sm">
                {COMPARISONS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                    <td className="py-4 px-6 font-medium text-slate-800 dark:text-slate-200">
                      {row.feature}
                    </td>
                    <td className="py-4 px-6 bg-blue-50/40 dark:bg-blue-600/5 border-x border-blue-200 dark:border-blue-500/20 text-center font-semibold">
                      {renderCell(row.outbox)}
                    </td>
                    <td className="py-4 px-6 text-center text-slate-600 dark:text-slate-400">
                      {renderCell(row.dropboxWeb)}
                    </td>
                    <td className="py-4 px-6 text-center text-slate-600 dark:text-slate-400">
                      {renderCell(row.officialClient)}
                    </td>
                    <td className="py-4 px-6 text-center text-slate-600 dark:text-slate-400">
                      {renderCell(row.rclone)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
