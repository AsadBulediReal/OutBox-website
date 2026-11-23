import React from 'react';
import { 
  FolderTree, 
  RotateCcw, 
  ShieldCheck, 
  KeyRound, 
  Lock, 
  CheckCircle2, 
  FolderSync, 
  SearchCheck,
  Zap
} from 'lucide-react';
import { FEATURES } from '../data/mockData';

export const FeatureGrid: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'FolderTree': return <FolderTree className="w-6 h-6 text-blue-400" />;
      case 'RotateCcw': return <RotateCcw className="w-6 h-6 text-sky-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
      case 'KeyRound': return <KeyRound className="w-6 h-6 text-amber-400" />;
      case 'Lock': return <Lock className="w-6 h-6 text-purple-400" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-6 h-6 text-teal-400" />;
      case 'FolderSync': return <FolderSync className="w-6 h-6 text-indigo-400" />;
      case 'SearchCheck': return <SearchCheck className="w-6 h-6 text-cyan-400" />;
      default: return <Zap className="w-6 h-6 text-blue-400" />;
    }
  };

  return (
    <section id="features" className="py-20 md:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Engine Capabilities
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Engineered for Massive Transfers & Precision.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Every feature was built to solve real-world transfer bottlenecks faced by creative professionals, developers, and teams handling giant cloud files.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/80 p-6 flex flex-col justify-between hover:border-blue-400 dark:hover:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-900/90 transition-all duration-300 group shadow-md dark:shadow-lg hover:shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/15 transition duration-500" />
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center group-hover:scale-105 transition transform">
                    {getIcon(item.icon)}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 font-semibold">
                    0{idx + 1}
                  </span>
                </div>

                <div className="mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">
                    {item.subtitle}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  {item.highlight}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-60 group-hover:opacity-100 transition" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
