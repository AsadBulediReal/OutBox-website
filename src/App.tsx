import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveAppSimulator } from './components/InteractiveAppSimulator';
import { ProblemSolution } from './components/ProblemSolution';
import { FeatureGrid } from './components/FeatureGrid';
import { HowItWorks } from './components/HowItWorks';
import { ComparisonTable } from './components/ComparisonTable';
import { ArchitectureSection } from './components/ArchitectureSection';
import { QuickStartTabs } from './components/QuickStartTabs';
import { UseCasesSection } from './components/UseCasesSection';
import { FaqSection } from './components/FaqSection';
import { DownloadModal } from './components/DownloadModal';
import { Footer } from './components/Footer';
import { SideRailAds } from './components/ads/SideRailAds';
import { LeaderboardAd } from './components/ads/LeaderboardAd';
import { FloatingBottomAd } from './components/ads/FloatingBottomAd';
import { AutoAdsManager } from './components/ads/AutoAdsManager';
import { Download, Apple } from 'lucide-react';

export function App() {
  // Light mode is default as requested
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState<boolean>(false);
  const [isAutoAdsOpen, setIsAutoAdsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  }, [darkMode]);

  const handleScrollToSimulator = () => {
    const el = document.getElementById('simulator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark text-slate-100' : 'text-slate-900'} relative bg-page-gradient selection:bg-blue-600 selection:text-white transition-colors duration-200`}>
      {/* Top Sticky Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenDownload={() => setIsDownloadOpen(true)}
        onScrollToSimulator={handleScrollToSimulator}
      />

      {/* Side Rail Skyscraper Ads (Left and Right gutters on large screens) */}
      <SideRailAds onOpenAutoAds={() => setIsAutoAdsOpen(true)} />

      <main>
        {/* Hero Section */}
        <Hero
          onOpenDownload={() => setIsDownloadOpen(true)}
          onScrollToSimulator={handleScrollToSimulator}
        />

        {/* Interactive App Simulator (Centerpiece) */}
        <section className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              Interactive Web Simulator
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Test-Drive the Outbox GUI Right in Your Browser
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">
              Experience the actual 3-step workflow: test link inspection, cherry-pick files in the tree, and simulate high-speed HTTP Range downloads with SHA-256 block verification.
            </p>
          </div>

          <InteractiveAppSimulator />
        </section>

        {/* In-Between Leaderboard Ad */}
        <LeaderboardAd onOpenAutoAds={() => setIsAutoAdsOpen(true)} />

        {/* Problem vs Solution Section */}
        <ProblemSolution />

        {/* Core Feature Deep-Dive Grid */}
        <FeatureGrid />

        {/* 3-Step Guided Workflow */}
        <HowItWorks />

        {/* Head-to-Head Comparison Matrix */}
        <ComparisonTable />

        {/* Architecture & Code Quality Section */}
        <ArchitectureSection />

        {/* Real-World Use Cases */}
        <UseCasesSection />

        {/* Setup & Quick-Start Tabs */}
        <QuickStartTabs />

        {/* Second In-Between Leaderboard Ad */}
        <LeaderboardAd defaultIndex={3} onOpenAutoAds={() => setIsAutoAdsOpen(true)} />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Final CTA Banner */}
        <section className="py-20 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="relative rounded-3xl p-10 sm:p-14 bg-gradient-to-b from-blue-50 to-indigo-50/50 dark:from-blue-900/40 dark:to-slate-900/90 border border-blue-200 dark:border-blue-500/30 shadow-2xl backdrop-blur-xl">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 mx-auto flex items-center justify-center p-3 shadow-xl shadow-blue-500/40 mb-6 select-none">
                <img src="/outbox_icon.svg" alt="Outbox" className="w-full h-full object-contain filter drop-shadow select-none pointer-events-none" draggable={false} />
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Stop Wrestling with 100 GB ZIP Files.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Download Outbox Downloader today. Selective, resumable, and cryptographically verified downloads from any Dropbox shared link. Official domain: outboxdownloader.com.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => setIsDownloadOpen(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/30 transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <Download className="w-5 h-5" />
                  <span>Download for Windows (.exe)</span>
                </button>
                <button
                  onClick={() => setIsDownloadOpen(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-2xl text-base font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-md transition"
                >
                  <Apple className="w-5 h-5 text-slate-800 dark:text-slate-200" />
                  <span>Download for Mac (.dmg)</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer onOpenAutoAds={() => setIsAutoAdsOpen(true)} />

      {/* Download Modal */}
      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
      />

      {/* Floating Sticky Bottom Ad Banner */}
      <FloatingBottomAd onOpenAutoAds={() => setIsAutoAdsOpen(true)} />

      {/* Auto Ads Controller Modal */}
      <AutoAdsManager
        isConfigOpen={isAutoAdsOpen}
        onCloseConfig={() => setIsAutoAdsOpen(false)}
      />
    </div>
  );
}

export default App;
