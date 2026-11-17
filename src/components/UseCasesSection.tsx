import React from 'react';
import { Video, Camera, Box, Music } from 'lucide-react';

export const UseCasesSection: React.FC = () => {
  const cases = [
    {
      title: 'Video Editors & Colorists',
      role: 'Post-Production',
      desc: 'Clients send a 250 GB shared folder with entire camera rolls, but you only need three 15 GB RED RAW takes and proxy cuts. Outbox grabs just those files with zero wasted SSD space.',
      icon: <Video className="w-6 h-6 text-purple-400" />,
      tag: '4K/8K Footage',
      saved: 'Saved 210 GB bandwidth',
    },
    {
      title: 'Commercial Photographers',
      role: 'Studio & Fashion',
      desc: 'Download only the 5-star marked camera selects from a 40 GB Sony ARW / Canon CR3 photoshoot without downloading 800 outtake shots.',
      icon: <Camera className="w-6 h-6 text-emerald-400" />,
      tag: 'RAW Burst Files',
      saved: 'Saved 32 GB bandwidth',
    },
    {
      title: 'Game Devs & 3D Artists',
      role: 'Unreal 5 & Blender',
      desc: 'Fetch specific 4K PBR Albedo and Normal maps or FBX meshes from giant asset pack repositories without unpacking massive 30 GB ZIP bundles.',
      icon: <Box className="w-6 h-6 text-sky-400" />,
      tag: 'Textures & Meshes',
      saved: 'Saved 24 GB bandwidth',
    },
    {
      title: 'Sound Designers & Composers',
      role: 'Audio Post & Stems',
      desc: 'Pull individual 24-bit 96kHz stem tracks or Foley recordings from orchestral recording session archives without choking your connection.',
      icon: <Music className="w-6 h-6 text-amber-400" />,
      tag: 'Multi-Track Stems',
      saved: 'Saved 18 GB bandwidth',
    },
  ];

  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Real-World Impact
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Built for Bandwidth-Heavy Workflows.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Whether you are on a metered travel connection, tight client deadline, or limited laptop SSD, Outbox gives you surgical download control.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cases.map((c, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between hover:border-blue-400 dark:hover:border-slate-700 transition group shadow-md dark:shadow-lg hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                    {c.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    {c.role}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                  {c.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {c.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-blue-600 dark:text-blue-400 font-mono font-semibold">{c.tag}</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-mono text-[11px] bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/20">
                  {c.saved}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
