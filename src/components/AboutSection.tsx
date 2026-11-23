import React from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Globe2, 
  CheckCircle2, 
  Lock, 
  Layers, 
  HeartHandshake, 
  ExternalLink 
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 relative overflow-hidden scroll-mt-20">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/20">
            About Outbox & Our Mission
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Built for Creators, Engineers & Power Users
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Outbox Downloader is an independent utility engineered to eliminate the friction of massive cloud shared folder downloads. We provide transparent, secure, and resilient software that puts file control back into your hands.
          </p>
        </div>

        {/* Narrative & Origin Story Card */}
        <div className="mb-16 rounded-3xl p-8 sm:p-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-xs font-semibold">
                <HeartHandshake className="w-4 h-4" />
                Our Mission & Principles
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Reliable Transfers Engineered for Modern Data
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Cloud datasets and production assets have outgrown standard web browsers. Outbox Downloader was built to bridge this gap: providing an independent, highly resilient desktop utility designed specifically for handling large-scale shared folders with total predictability.
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Our philosophy centers on user control and transparency: zero telemetry collection, zero intermediate servers, and open architectural standards that run purely on your local machine.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Client-Side TLS
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Zero Telemetry Tracking
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Open Engineering Standards
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-slate-800/80 dark:to-slate-900/90 rounded-2xl p-6 sm:p-8 border border-blue-200/60 dark:border-slate-700/60 shadow-inner space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                Key Performance Metrics
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700">
                  <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">100%</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">Direct Client TLS</div>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700">
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">0 B</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">Payload Stored by Us</div>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700">
                  <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">SHA-256</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">Bit-Level Validation</div>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700">
                  <div className="text-2xl sm:text-3xl font-extrabold text-purple-600 dark:text-purple-400">24/7</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">Resilient Retries</div>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
                Data streams directly between your computer and Dropbox content servers. Outbox Downloader operates completely client-side.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars of Trust & AdSense Compliance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Pillar 1: Privacy & Zero Proxy */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/40 transition group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5 group-hover:scale-105 transition">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Zero Intermediary Servers
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              We do not route your file streams through proxy servers, cloud relays, or caching layers. All network connections are established directly between your desktop client and Dropbox&rsquo;s official edge CDN over TLS 1.3 encryption. Your data stays strictly yours.
            </p>
          </div>

          {/* Pillar 2: Resilient Native Architecture */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/40 transition group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-105 transition">
              <Cpu className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              High-Throughput Native Engine
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Built on PySide6 and modern concurrency frameworks, Outbox Downloader utilizes segmented HTTP chunking, dynamic multi-threading, and persistent socket reuse to maximize your local bandwidth while keeping system resource utilization lean.
            </p>
          </div>

          {/* Pillar 3: AdSense & Funding Policy */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/40 transition group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-5 group-hover:scale-105 transition">
              <Globe2 className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Ethical & Transparent Funding
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Our official website <span className="font-semibold text-blue-600 dark:text-blue-400">outboxdownloader.com</span> is supported by non-intrusive Google AdSense advertising. This transparent model funds ongoing development, fast CDN hosting, and prompt security updates while keeping the software free to download.
            </p>
          </div>

          {/* Pillar 4: Independence & Compliance */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/40 transition group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-5 group-hover:scale-105 transition">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Clear Independent Disclosure
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Outbox Downloader is an independently engineered utility created to improve cloud file accessibility. We are not affiliated, associated, authorized, endorsed by, or in any way officially connected with Dropbox, Inc. Dropbox and the Dropbox logo are registered trademarks of Dropbox, Inc.
            </p>
          </div>
        </div>

        {/* Commitment Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-blue-600/30">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                Have questions or need enterprise support?
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Reach out to our engineering and support team directly via our contact form below.
              </div>
            </div>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-sm transition whitespace-nowrap"
          >
            Contact Team
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
