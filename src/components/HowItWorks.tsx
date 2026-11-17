import React from 'react';
import { Link2, CheckSquare, DownloadCloud } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Link & Connect',
      tag: 'Step 1',
      description: 'Authenticate in 1 click using Dropbox PKCE browser OAuth without sharing API secrets. Paste any public, team, or password-protected shared folder link.',
      details: [
        'Single unified link input with auto-password prompt',
        'Direct destination matching to prevent duplicate folders',
        'Recent links chips for fast reloading',
      ],
      icon: <Link2 className="w-6 h-6 text-blue-400" />,
      color: 'from-blue-500/20 to-indigo-500/10',
      border: 'border-blue-500/30',
    },
    {
      num: '02',
      title: 'Cherry-Pick in Tree',
      tag: 'Step 2',
      description: 'Outbox queries remote metadata and renders a lightning-fast visual directory tree. Browse subfolders, inspect exact file sizes, and select only what you need.',
      details: [
        'Expandable folder trees with instant search/filter',
        'Recursive checkbox propagation and byte counters',
        'Bypass massive 20 GB / 10,000 file zip limits',
      ],
      icon: <CheckSquare className="w-6 h-6 text-sky-400" />,
      color: 'from-sky-500/20 to-blue-500/10',
      border: 'border-sky-500/30',
    },
    {
      num: '03',
      title: 'Stream & Verify',
      tag: 'Step 3',
      description: 'Download files with HTTP Range resumability. Each file is verified against Dropbox SHA-256 block hashes (content_hash) with automatic self-repair.',
      details: [
        'Safe 4 KB rewind buffer on paused/resumed transfers',
        'Real-time transfer speed, elapsed time, and ETA telemetry',
        'Dedicated "Verify Files" button to audit existing folders',
      ],
      icon: <DownloadCloud className="w-6 h-6 text-emerald-400" />,
      color: 'from-emerald-500/20 to-teal-500/10',
      border: 'border-emerald-500/30',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Simple 3-Step Flow
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How Outbox Works
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            From pasted link to verified local files in three friction-free steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`rounded-3xl bg-slate-900/80 border ${step.border} p-8 flex flex-col justify-between relative shadow-xl hover:shadow-2xl transition duration-300 group overflow-hidden`}
            >
              <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${step.color} rounded-full blur-3xl pointer-events-none`} />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:scale-105 transition transform shadow-md">
                    {step.icon}
                  </div>
                  <span className="text-2xl font-black font-mono text-slate-700 group-hover:text-slate-500 transition">
                    {step.num}
                  </span>
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono">
                  {step.tag}
                </span>
                <h3 className="text-xl font-bold text-white mt-1 mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {step.description}
                </p>

                <div className="space-y-2 pt-4 border-t border-slate-800/80">
                  {step.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
