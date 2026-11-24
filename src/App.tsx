import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveAppSimulator } from './components/InteractiveAppSimulator';
import { FeatureGrid } from './components/FeatureGrid';
import { HowItWorks } from './components/HowItWorks';
import { ComparisonTable } from './components/ComparisonTable';
import { QuickStartTabs } from './components/QuickStartTabs';
import { FaqSection } from './components/FaqSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { LegalModal } from './components/LegalModal';
import { DownloadModal } from './components/DownloadModal';
import { Footer } from './components/Footer';
import { SideRailAds } from './components/ads/SideRailAds';
import { LeaderboardAd } from './components/ads/LeaderboardAd';
import { FloatingBottomAd } from './components/ads/FloatingBottomAd';
import { AutoAdsManager } from './components/ads/AutoAdsManager';
import { ReleaseProvider } from './context/ReleaseContext';
import { registerOutboxWebMcpTools } from './utils/webmcp';

const THEME_STORAGE_KEY = 'outbox_theme';

export function App() {
  // Follow system theme by default, or use saved user preference
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'dark') return true;
      if (saved === 'light') return false;
    } catch {
      // Ignore localStorage read errors
    }
    return (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-color-scheme: dark)').matches
    );
  });
  const [isDownloadOpen, setIsDownloadOpen] = useState<boolean>(false);
  const [downloadOs, setDownloadOs] = useState<'win' | 'mac' | undefined>(undefined);
  const [isAutoAdsOpen, setIsAutoAdsOpen] = useState<boolean>(false);
  const [legalModalTab, setLegalModalTab] = useState<'privacy' | 'terms' | null>(null);

  const handleSetDarkMode = (nextDark: boolean) => {
    setDarkMode(nextDark);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextDark ? 'dark' : 'light');
    } catch {
      // Ignore localStorage write errors
    }
  };

  const handleOpenDownload = (os?: 'win' | 'mac') => {
    setDownloadOs(os);
    setIsDownloadOpen(true);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  }, [darkMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!mediaQuery) return;

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      try {
        const saved = localStorage.getItem(THEME_STORAGE_KEY);
        if (saved === 'dark' || saved === 'light') return;
      } catch {
        // Ignore localStorage read errors
      }
      setDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  useEffect(() => {
    return registerOutboxWebMcpTools(() => handleOpenDownload());
  }, []);

  const handleScrollToSimulator = () => {
    const el = document.getElementById('simulator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ReleaseProvider>
      <div className={`min-h-screen ${darkMode ? 'dark text-slate-100' : 'text-slate-900'} relative bg-page-gradient selection:bg-blue-600 selection:text-white transition-colors duration-200`}>
        {/* Top Sticky Navbar */}
        <Navbar
          darkMode={darkMode}
          setDarkMode={handleSetDarkMode}
          onOpenDownload={() => handleOpenDownload()}
          onScrollToSimulator={handleScrollToSimulator}
        />

        {/* Side Rail Skyscraper Ads (Left and Right gutters on large screens) */}
        <SideRailAds onOpenAutoAds={() => setIsAutoAdsOpen(true)} />

        <main>
          {/* Hero Section */}
          <Hero
            onOpenDownload={handleOpenDownload}
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

          {/* Core Feature Deep-Dive Grid */}
          <FeatureGrid />

          {/* 3-Step Guided Workflow */}
          <HowItWorks />

          {/* Head-to-Head Comparison Matrix */}
          <ComparisonTable />

          {/* Setup & Quick-Start Tabs */}
          <QuickStartTabs />

          {/* Second In-Between Leaderboard Ad */}
          <LeaderboardAd defaultIndex={3} onOpenAutoAds={() => setIsAutoAdsOpen(true)} />

          {/* About Us & Engineering Mission (Crucial for AdSense EEAT) */}
          <AboutSection />

          {/* Frequently Asked Questions */}
          <FaqSection />

          {/* Contact Support & Engineering Form (Crucial for AdSense Trust) */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer 
          onOpenLegal={(tab) => setLegalModalTab(tab)}
        />

        {/* Legal & Compliance Modal (Privacy Policy & Terms) */}
        <LegalModal
          isOpen={legalModalTab !== null}
          initialTab={legalModalTab || 'privacy'}
          onClose={() => setLegalModalTab(null)}
        />

        {/* Download Modal */}
        <DownloadModal
          isOpen={isDownloadOpen}
          initialOs={downloadOs}
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
    </ReleaseProvider>
  );
}

export default App;
