import React from 'react';
import { Check, X } from 'lucide-react';
import { COMPARISONS } from '../data/mockData';

export const ComparisonTable: React.FC = () => {
  const renderCell = (val: boolean | string) => {
    if (typeof val === 'boolean') {
      return val ? (
        <div className="flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <Check className="w-3.5 h-3.5" />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
            <X className="w-3.5 h-3.5" />
          </div>
        </div>
      );
    }
    return <span className="text-xs text-slate-400 leading-tight">{val}</span>;
  };

  return (
    <section id="comparison" className="py-20 md:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Head-to-Head Comparison
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How Outbox Compares
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            See how Outbox matches up against traditional web downloads, the official desktop client, and complex CLI utilities.
          </p>
        </div>

        {/* Comparison Table Card */}
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/70">
                  <th className="py-5 px-6 text-sm font-bold text-slate-300 w-1/3">
                    Capability / Feature
                  </th>
                  <th className="py-5 px-6 text-sm font-bold text-blue-400 bg-blue-600/10 border-x border-blue-500/20 text-center w-1/6">
                    <div className="flex flex-col items-center">
                      <span className="text-base font-extrabold text-white">Outbox</span>
                      <span className="text-[10px] text-blue-300 uppercase tracking-widest font-mono">Recommended</span>
                    </div>
                  </th>
                  <th className="py-5 px-6 text-sm font-bold text-slate-300 text-center w-1/6">
                    <div className="flex flex-col items-center">
                      <span>Dropbox Web</span>
                      <span className="text-[10px] text-slate-500">Default ZIP</span>
                    </div>
                  </th>
                  <th className="py-5 px-6 text-sm font-bold text-slate-300 text-center w-1/6">
                    <div className="flex flex-col items-center">
                      <span>Official Client</span>
                      <span className="text-[10px] text-slate-500">Sync App</span>
                    </div>
                  </th>
                  <th className="py-5 px-6 text-sm font-bold text-slate-300 text-center w-1/6">
                    <div className="flex flex-col items-center">
                      <span>rclone / wget</span>
                      <span className="text-[10px] text-slate-500">CLI Scripts</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-sm">
                {COMPARISONS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-850/50 transition">
                    <td className="py-4 px-6 font-medium text-slate-200">
                      {row.feature}
                    </td>
                    <td className="py-4 px-6 bg-blue-600/5 border-x border-blue-500/20 text-center font-semibold">
                      {renderCell(row.outbox)}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {renderCell(row.dropboxWeb)}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {renderCell(row.officialClient)}
                    </td>
                    <td className="py-4 px-6 text-center">
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
